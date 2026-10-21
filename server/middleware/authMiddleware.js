const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Organization = require("../models/organization");
const OrganizationMembership = require("../models/organizationMembership");
const Event = require("../models/event");
const EventAssignment = require("../models/eventAssignment");
const { ROLES, roleHasPermission } = require("../config/permissions");

/**
 * 1. Authenticate user via JWT Bearer Token
 */
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required. No Bearer token provided." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required. Invalid Bearer token format." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid or expired authentication token." });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User account no longer exists." });
    }

    if (user.status === "suspended") {
      return res.status(403).json({ message: "Your account is suspended. Access denied." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Authentication token has expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid authentication token." });
  }
};

/**
 * 2. Require Platform Super Admin Privileges
 */
const requireSuperAdmin = (req, res, next) => {
  if (!req.user || !req.user.isSuperAdmin) {
    return res.status(403).json({ message: "Access denied. Super administrator privileges required." });
  }
  next();
};

/**
 * 3. Resolve Organization Scope & Membership
 */
const resolveOrgScope = async (req, res, next) => {
  try {
    const orgId = req.params.orgId || req.body.orgId || req.query.orgId || req.headers["x-organization-id"];

    if (!orgId) {
      return res.status(400).json({ message: "Organization ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(orgId)) {
      return res.status(400).json({ message: "Invalid Organization ID format." });
    }

    const org = await Organization.findById(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found." });
    }

    req.organization = org;

    // Platform Super Admin gets full access
    if (req.user.isSuperAdmin) {
      req.userOrgRole = ROLES.SUPER_ADMIN;
      return next();
    }

    if (org.status === "suspended") {
      return res.status(403).json({ message: "This organization is suspended." });
    }

    const membership = await OrganizationMembership.findOne({
      organization: org._id,
      user: req.user._id,
      status: "active",
    });

    if (!membership) {
      return res.status(403).json({ message: "Access denied. You are not an active member of this organization." });
    }

    req.orgMembership = membership;
    req.userOrgRole = membership.role;
    next();
  } catch (error) {
    console.error("resolveOrgScope error:", error);
    return res.status(500).json({ message: "Internal server error resolving organization scope." });
  }
};

/**
 * 4. Require Specific Organization Permission
 */
const requireOrgPermission = (permission) => {
  return [
    resolveOrgScope,
    (req, res, next) => {
      if (req.user.isSuperAdmin) {
        return next();
      }

      if (!roleHasPermission(req.userOrgRole, permission)) {
        return res.status(403).json({
          message: `Access denied. Missing required permission: ${permission}`,
        });
      }

      next();
    },
  ];
};

/**
 * 5. Resolve Event Scope & User's Event Authority
 */
const resolveEventScope = async (req, res, next) => {
  try {
    const eventId = req.params.eventId || req.body.eventId || req.query.eventId;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid Event ID format." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    req.event = event;

    const org = await Organization.findById(event.organization);
    if (!org) {
      return res.status(404).json({ message: "Owning organization not found for this event." });
    }

    req.organization = org;

    // Platform Super Admin override
    if (req.user.isSuperAdmin) {
      req.effectiveRole = ROLES.SUPER_ADMIN;
      req.customPermissions = [];
      return next();
    }

    if (org.status === "suspended") {
      return res.status(403).json({ message: "Event's organization is suspended." });
    }

    // Check organization membership
    const orgMembership = await OrganizationMembership.findOne({
      organization: org._id,
      user: req.user._id,
      status: "active",
    });

    // Check direct event assignment
    const eventAssignment = await EventAssignment.findOne({
      event: event._id,
      user: req.user._id,
      status: "active",
    });

    if (eventAssignment) {
      req.eventAssignment = eventAssignment;
      req.effectiveRole = eventAssignment.role;
      req.customPermissions = eventAssignment.customPermissions || [];
      return next();
    }

    // Organization owner has full management over all org events
    if (orgMembership && orgMembership.role === ROLES.ORGANIZATION_OWNER) {
      req.orgMembership = orgMembership;
      req.effectiveRole = ROLES.ORGANIZATION_OWNER;
      req.customPermissions = [];
      return next();
    }

    // User is an org member, but not explicitly assigned to this specific event
    // They are granted base attendee access for this event, preventing unassigned staff/manager operations
    if (orgMembership) {
      req.orgMembership = orgMembership;
      req.effectiveRole = ROLES.ATTENDEE;
      req.customPermissions = [];
      return next();
    }

    // User has no membership or assignment on this event
    return res.status(403).json({
      message: "Access denied. You are not assigned to this event or organization.",
    });
  } catch (error) {
    console.error("resolveEventScope error:", error);
    return res.status(500).json({ message: "Internal server error resolving event scope." });
  }
};

/**
 * 6. Require Specific Event Permission
 */
const requireEventPermission = (permission) => {
  return [
    resolveEventScope,
    (req, res, next) => {
      if (req.user.isSuperAdmin) {
        return next();
      }

      const hasPerm = roleHasPermission(req.effectiveRole, permission, req.customPermissions);
      if (!hasPerm) {
        return res.status(403).json({
          message: `Access denied. Insufficient permissions for this event: missing ${permission}`,
        });
      }

      next();
    },
  ];
};

module.exports = {
  authenticateUser,
  requireSuperAdmin,
  resolveOrgScope,
  requireOrgPermission,
  resolveEventScope,
  requireEventPermission,
};
