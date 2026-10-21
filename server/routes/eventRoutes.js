const express = require("express");
const router = express.Router();
const {
  getEventById,
  updateEvent,
  deleteEvent,
  listEventAssignments,
  assignUserToEvent,
  revokeEventAssignment,
} = require("../controllers/eventController");
const {
  scanCheckInTicket,
  createTicket,
  listEventTickets,
} = require("../controllers/checkinController");
const {
  sendEventCommunication,
  listCommunicationLogs,
} = require("../controllers/communicationController");
const {
  authenticateUser,
  requireEventPermission,
} = require("../middleware/authMiddleware");
const { PERMISSIONS } = require("../config/permissions");

// All event routes require authenticated user
router.use(authenticateUser);

// Event Details & Management
router.get("/:eventId", requireEventPermission(PERMISSIONS.EVENTS_READ), getEventById);
router.put("/:eventId", requireEventPermission(PERMISSIONS.EVENTS_UPDATE), updateEvent);
router.delete("/:eventId", requireEventPermission(PERMISSIONS.EVENTS_DELETE), deleteEvent);

// Event Assignments (Team Staff & Managers)
router.get("/:eventId/assignments", requireEventPermission(PERMISSIONS.EVENTS_READ), listEventAssignments);
router.post("/:eventId/assignments", requireEventPermission(PERMISSIONS.EVENTS_UPDATE), assignUserToEvent);
router.delete("/:eventId/assignments/:assignmentId", requireEventPermission(PERMISSIONS.EVENTS_UPDATE), revokeEventAssignment);

// Check-in & Tickets
router.post("/:eventId/checkin", requireEventPermission(PERMISSIONS.CHECKIN_SCAN), scanCheckInTicket);
router.get("/:eventId/tickets", requireEventPermission(PERMISSIONS.REGISTRATIONS_READ), listEventTickets);
router.post("/:eventId/tickets", requireEventPermission(PERMISSIONS.REGISTRATIONS_MANAGE), createTicket);

// Communications
router.post("/:eventId/communications/send", requireEventPermission(PERMISSIONS.COMMUNICATIONS_SEND), sendEventCommunication);
router.get("/:eventId/communications/logs", requireEventPermission(PERMISSIONS.COMMUNICATIONS_READ), listCommunicationLogs);

module.exports = router;
