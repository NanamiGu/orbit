const crypto = require("crypto");
const mongoose = require("mongoose");
const Organization = require("../models/organization");
const OrganizationMembership = require("../models/organizationMembership");
const EventAssignment = require("../models/eventAssignment");
const Invitation = require("../models/invitation");
const User = require("../models/user");
const { ROLES } = require("../config/permissions");

/**
 * 1. Create a new organization
 */
const createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Organization name is required." });
    }

    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Ensure slug uniqueness
    let slug = baseSlug || "org";
    let count = 0;
    while (await Organization.findOne({ slug })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }

    const organization = new Organization({
      name: name.trim(),
      slug,
      description: description ? description.trim() : "",
      owner: req.user._id,
      status: "active",
    });

    const savedOrg = await organization.save();

    // Automatically make creator the organization_owner
    const membership = new OrganizationMembership({
      organization: savedOrg._id,
      user: req.user._id,
      role: ROLES.ORGANIZATION_OWNER,
      status: "active",
    });

    await membership.save();

    return res.status(201).json({
      message: "Organization created successfully.",
      organization: savedOrg,
      membership,
    });
  } catch (error) {
    console.error("createOrganization error:", error);
    return res.status(500).json({ message: "Internal error creating organization." });
  }
};

/**
 * 2. Get organizations accessible to the current user
 */
const getUserOrganizations = async (req, res) => {
  try {
    if (req.user.isSuperAdmin) {
      // Platform super admins can view all organizations
      const allOrgs = await Organization.find()
        .populate("owner", "name email")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        organizations: allOrgs.map((org) => ({
          ...org.toObject(),
          userRole: ROLES.SUPER_ADMIN,
        })),
      });
    }

    // Standard users: find organizations where they are active members
    const memberships = await OrganizationMembership.find({
      user: req.user._id,
      status: "active",
    }).populate({
      path: "organization",
      populate: { path: "owner", select: "name email" },
    });

    const orgs = memberships
      .filter((m) => m.organization && m.organization.status === "active")
      .map((m) => ({
        ...m.organization.toObject(),
        userRole: m.role,
        membershipId: m._id,
      }));

    return res.status(200).json({ organizations: orgs });
  } catch (error) {
    console.error("getUserOrganizations error:", error);
    return res.status(500).json({ message: "Internal error retrieving organizations." });
  }
};

/**
 * 3. Get single organization details
 */
const getOrganizationById = async (req, res) => {
  try {
    return res.status(200).json({
      organization: req.organization,
      userRole: req.userOrgRole,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal error retrieving organization." });
  }
};

/**
 * 4. Update organization details
 */
const updateOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const org = req.organization;

    if (name && typeof name === "string" && name.trim()) {
      org.name = name.trim();
    }
    if (typeof description === "string") {
      org.description = description.trim();
    }

    const updated = await org.save();
    return res.status(200).json({
      message: "Organization updated successfully.",
      organization: updated,
    });
  } catch (error) {
    console.error("updateOrganization error:", error);
    return res.status(500).json({ message: "Internal error updating organization." });
  }
};

/**
 * 5. List organization members
 */
const listMembers = async (req, res) => {
  try {
    const members = await OrganizationMembership.find({
      organization: req.organization._id,
    })
      .populate("user", "name email gender status createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({ members });
  } catch (error) {
    console.error("listMembers error:", error);
    return res.status(500).json({ message: "Internal error retrieving members." });
  }
};

/**
 * 6. Invite a new team member by email
 */
const inviteMember = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ message: "Valid email address is required." });
    }

    const allowedRoles = [
      ROLES.ORGANIZATION_OWNER,
      ROLES.EVENT_MANAGER,
      ROLES.EVENT_STAFF,
      ROLES.COMMUNICATION_MANAGER,
      ROLES.ATTENDEE,
    ];

    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role specified. Allowed roles are: ${allowedRoles.join(", ")}`,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user is already an active member
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const activeMembership = await OrganizationMembership.findOne({
        organization: req.organization._id,
        user: existingUser._id,
        status: "active",
      });

      if (activeMembership) {
        return res.status(400).json({
          message: "User is already an active member of this organization.",
        });
      }
    }

    // Revoke any previous pending invitations for this email in this org
    await Invitation.updateMany(
      { organization: req.organization._id, email: normalizedEmail, status: "pending" },
      { $set: { status: "revoked" } }
    );

    // Generate secure token & 48h expiration
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    const invitation = new Invitation({
      organization: req.organization._id,
      email: normalizedEmail,
      role,
      token,
      invitedBy: req.user._id,
      status: "pending",
      expiresAt,
    });

    const savedInvitation = await invitation.save();

    return res.status(201).json({
      message: "Invitation created successfully.",
      invitation: savedInvitation,
      invitationLink: `/invite/accept?token=${token}`,
      emailDeliveryNote: "SMTP mail server is currently unconfigured; invitation token is recorded in system.",
    });
  } catch (error) {
    console.error("inviteMember error:", error);
    return res.status(500).json({ message: "Internal error creating invitation." });
  }
};

/**
 * 7. List pending invitations for an organization
 */
const listInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({
      organization: req.organization._id,
      status: "pending",
    })
      .populate("invitedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ invitations });
  } catch (error) {
    console.error("listInvitations error:", error);
    return res.status(500).json({ message: "Internal error retrieving invitations." });
  }
};

/**
 * 8. Revoke an invitation
 */
const revokeInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(invitationId)) {
      return res.status(400).json({ message: "Invalid invitation ID." });
    }

    const invitation = await Invitation.findOne({
      _id: invitationId,
      organization: req.organization._id,
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    invitation.status = "revoked";
    await invitation.save();

    return res.status(200).json({ message: "Invitation revoked successfully." });
  } catch (error) {
    console.error("revokeInvitation error:", error);
    return res.status(500).json({ message: "Internal error revoking invitation." });
  }
};

/**
 * 9. Accept an invitation (User must be authenticated)
 */
const acceptInvitation = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token || typeof token !== "string" || !token.trim()) {
      return res.status(400).json({ message: "Invitation token is required." });
    }

    const invitation = await Invitation.findOne({ token: token.trim() });
    if (!invitation) {
      return res.status(404).json({ message: "Invalid or non-existent invitation token." });
    }

    if (invitation.status !== "pending") {
      return res.status(400).json({
        message: `This invitation has already been ${invitation.status}.`,
      });
    }

    if (new Date() > invitation.expiresAt) {
      invitation.status = "expired";
      await invitation.save();
      return res.status(400).json({ message: "This invitation has expired." });
    }

    // Verify invitation recipient matches the authenticated user's email
    if (req.user.email.toLowerCase() !== invitation.email.toLowerCase()) {
      return res.status(403).json({
        message: `This invitation was issued to ${invitation.email}. You are logged in as ${req.user.email}.`,
      });
    }

    // Create or update membership
    const membership = await OrganizationMembership.findOneAndUpdate(
      {
        organization: invitation.organization,
        user: req.user._id,
      },
      {
        $set: {
          role: invitation.role,
          status: "active",
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    invitation.status = "accepted";
    await invitation.save();

    return res.status(200).json({
      message: "Invitation accepted successfully. Welcome to the organization!",
      membership,
    });
  } catch (error) {
    console.error("acceptInvitation error:", error);
    return res.status(500).json({ message: "Internal error accepting invitation." });
  }
};

/**
 * 10. Update member role in organization
 */
const updateMemberRole = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: "Invalid member ID." });
    }

    const allowedRoles = [
      ROLES.ORGANIZATION_OWNER,
      ROLES.EVENT_MANAGER,
      ROLES.EVENT_STAFF,
      ROLES.COMMUNICATION_MANAGER,
      ROLES.ATTENDEE,
    ];

    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    const membership = await OrganizationMembership.findOne({
      _id: memberId,
      organization: req.organization._id,
    });

    if (!membership) {
      return res.status(404).json({ message: "Membership record not found." });
    }

    // Prevent changing the primary organization owner's role without ownership transfer
    if (String(membership.user) === String(req.organization.owner) && role !== ROLES.ORGANIZATION_OWNER) {
      return res.status(400).json({
        message: "Cannot demote the primary organization owner. Transfer ownership first.",
      });
    }

    membership.role = role;
    await membership.save();

    return res.status(200).json({
      message: "Member role updated successfully.",
      membership,
    });
  } catch (error) {
    console.error("updateMemberRole error:", error);
    return res.status(500).json({ message: "Internal error updating member role." });
  }
};

/**
 * 11. Remove a member from an organization
 */
const removeMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: "Invalid member ID." });
    }

    const membership = await OrganizationMembership.findOne({
      _id: memberId,
      organization: req.organization._id,
    });

    if (!membership) {
      return res.status(404).json({ message: "Membership record not found." });
    }

    // Cannot remove the primary owner
    if (String(membership.user) === String(req.organization.owner)) {
      return res.status(400).json({
        message: "Cannot remove the primary organization owner.",
      });
    }

    // Remove event assignments within this organization
    await EventAssignment.deleteMany({
      organization: req.organization._id,
      user: membership.user,
    });

    // Delete membership
    await OrganizationMembership.deleteOne({ _id: membership._id });

    return res.status(200).json({ message: "Member removed from organization successfully." });
  } catch (error) {
    console.error("removeMember error:", error);
    return res.status(500).json({ message: "Internal error removing member." });
  }
};

/**
 * 12. Super Admin: Suspend or reactivate organization
 */
const toggleOrganizationStatus = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { status } = req.body;

    if (!["active", "suspended"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'active' or 'suspended'." });
    }

    const org = await Organization.findById(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found." });
    }

    org.status = status;
    await org.save();

    return res.status(200).json({
      message: `Organization ${status === "suspended" ? "suspended" : "reactivated"} successfully.`,
      organization: org,
    });
  } catch (error) {
    console.error("toggleOrganizationStatus error:", error);
    return res.status(500).json({ message: "Internal error changing organization status." });
  }
};

/**
 * 13. Super Admin: Suspend or reactivate user
 */
const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["active", "suspended"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'active' or 'suspended'." });
    }

    if (String(req.user._id) === String(userId) && status === "suspended") {
      return res.status(400).json({ message: "Super admins cannot suspend their own account." });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    targetUser.status = status;
    await targetUser.save();

    return res.status(200).json({
      message: `User ${status === "suspended" ? "suspended" : "reactivated"} successfully.`,
      user: {
        id: targetUser._id,
        email: targetUser.email,
        status: targetUser.status,
      },
    });
  } catch (error) {
    console.error("toggleUserStatus error:", error);
    return res.status(500).json({ message: "Internal error changing user status." });
  }
};

module.exports = {
  createOrganization,
  getUserOrganizations,
  getOrganizationById,
  updateOrganization,
  listMembers,
  inviteMember,
  listInvitations,
  revokeInvitation,
  acceptInvitation,
  updateMemberRole,
  removeMember,
  toggleOrganizationStatus,
  toggleUserStatus,
};
