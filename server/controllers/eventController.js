const mongoose = require("mongoose");
const Event = require("../models/event");
const EventAssignment = require("../models/eventAssignment");
const OrganizationMembership = require("../models/organizationMembership");
const { ROLES } = require("../config/permissions");

/**
 * 1. Create a new event within an organization
 */
const createEvent = async (req, res) => {
  try {
    const { name, description, price, date, location } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Event name is required." });
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      return res.status(400).json({ message: "Event description is required." });
    }

    const event = new Event({
      name: name.trim(),
      description: description.trim(),
      price: typeof price === "number" ? price : Number(price) || 0,
      date: date ? new Date(date) : new Date(),
      location: location ? location.trim() : "Algiers, Algeria",
      organization: req.organization._id,
      createdBy: req.user._id,
      status: "published",
    });

    const savedEvent = await event.save();

    // If user is not the primary organization owner, assign them as event_manager
    if (req.userOrgRole !== ROLES.ORGANIZATION_OWNER) {
      await EventAssignment.create({
        event: savedEvent._id,
        user: req.user._id,
        organization: req.organization._id,
        role: ROLES.EVENT_MANAGER,
        status: "active",
      });
    }

    return res.status(201).json({
      message: "Event created successfully.",
      event: savedEvent,
    });
  } catch (error) {
    console.error("createEvent error:", error);
    return res.status(500).json({ message: "Internal error creating event." });
  }
};

/**
 * 2. List events for an organization
 */
const listOrgEvents = async (req, res) => {
  try {
    const orgId = req.organization._id;

    // Organization owner and super admin see all events for this organization
    if (req.user.isSuperAdmin || req.userOrgRole === ROLES.ORGANIZATION_OWNER) {
      const events = await Event.find({ organization: orgId }).sort({ createdAt: -1 });
      return res.status(200).json({ events });
    }

    // Event staff, event managers, and communication managers see events they are assigned to
    const assignments = await EventAssignment.find({
      organization: orgId,
      user: req.user._id,
      status: "active",
    });

    const assignedEventIds = assignments.map((a) => a.event);

    const events = await Event.find({
      organization: orgId,
      _id: { $in: assignedEventIds },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ events });
  } catch (error) {
    console.error("listOrgEvents error:", error);
    return res.status(500).json({ message: "Internal error listing events." });
  }
};

/**
 * 3. Get single event details
 */
const getEventById = async (req, res) => {
  try {
    return res.status(200).json({
      event: req.event,
      effectiveRole: req.effectiveRole,
      customPermissions: req.customPermissions || [],
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal error retrieving event." });
  }
};

/**
 * 4. Update an event
 */
const updateEvent = async (req, res) => {
  try {
    const { name, description, price, date, location, status } = req.body;
    const event = req.event;

    if (name && typeof name === "string" && name.trim()) event.name = name.trim();
    if (description && typeof description === "string" && description.trim()) event.description = description.trim();
    if (price !== undefined) event.price = Number(price);
    if (date) event.date = new Date(date);
    if (location && typeof location === "string") event.location = location.trim();
    if (status && ["draft", "published", "archived"].includes(status)) event.status = status;

    const updated = await event.save();
    return res.status(200).json({
      message: "Event updated successfully.",
      event: updated,
    });
  } catch (error) {
    console.error("updateEvent error:", error);
    return res.status(500).json({ message: "Internal error updating event." });
  }
};

/**
 * 5. Delete an event
 */
const deleteEvent = async (req, res) => {
  try {
    // Only organization owner or platform super admin can delete events
    if (!req.user.isSuperAdmin && req.effectiveRole !== ROLES.ORGANIZATION_OWNER) {
      return res.status(403).json({
        message: "Access denied. Only organization owners can delete events.",
      });
    }

    await EventAssignment.deleteMany({ event: req.event._id });
    await Event.deleteOne({ _id: req.event._id });

    return res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("deleteEvent error:", error);
    return res.status(500).json({ message: "Internal error deleting event." });
  }
};

/**
 * 6. List team assignments for a specific event
 */
const listEventAssignments = async (req, res) => {
  try {
    const assignments = await EventAssignment.find({ event: req.event._id })
      .populate("user", "name email gender")
      .sort({ createdAt: -1 });

    return res.status(200).json({ assignments });
  } catch (error) {
    console.error("listEventAssignments error:", error);
    return res.status(500).json({ message: "Internal error retrieving event assignments." });
  }
};

/**
 * 7. Assign a team member to an event
 */
const assignUserToEvent = async (req, res) => {
  try {
    const { userId, role, customPermissions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const allowedRoles = [
      ROLES.EVENT_MANAGER,
      ROLES.EVENT_STAFF,
      ROLES.COMMUNICATION_MANAGER,
    ];

    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid event role. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    // Verify user is an active member of the owning organization
    const orgMembership = await OrganizationMembership.findOne({
      organization: req.event.organization,
      user: userId,
      status: "active",
    });

    if (!orgMembership) {
      return res.status(400).json({
        message: "Target user must be an active member of the organization before being assigned to this event.",
      });
    }

    const assignment = await EventAssignment.findOneAndUpdate(
      {
        event: req.event._id,
        user: userId,
      },
      {
        $set: {
          organization: req.event.organization,
          role,
          customPermissions: Array.isArray(customPermissions) ? customPermissions : [],
          status: "active",
        },
      },
      { upsert: true, returnDocument: "after" }
    ).populate("user", "name email");

    return res.status(200).json({
      message: "Event assignment saved successfully.",
      assignment,
    });
  } catch (error) {
    console.error("assignUserToEvent error:", error);
    return res.status(500).json({ message: "Internal error assigning user to event." });
  }
};

/**
 * 8. Revoke a team member's assignment from an event
 */
const revokeEventAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: "Invalid assignment ID." });
    }

    await EventAssignment.deleteOne({
      _id: assignmentId,
      event: req.event._id,
    });

    return res.status(200).json({ message: "Event assignment revoked successfully." });
  } catch (error) {
    console.error("revokeEventAssignment error:", error);
    return res.status(500).json({ message: "Internal error revoking assignment." });
  }
};

module.exports = {
  createEvent,
  listOrgEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  listEventAssignments,
  assignUserToEvent,
  revokeEventAssignment,
};
