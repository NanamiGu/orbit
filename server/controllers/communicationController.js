const CommunicationLog = require("../models/communicationLog");
const Ticket = require("../models/ticket");

/**
 * 1. Send / Simulate an event communication (Email/Notification)
 */
const sendEventCommunication = async (req, res) => {
  try {
    const { subject, message, audience = "all_attendees" } = req.body;
    const event = req.event;

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return res.status(400).json({ message: "Communication subject is required." });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message body is required." });
    }

    // Verify recipients belong to this specific event
    const filter = { event: event._id };
    if (audience === "checked_in") {
      filter.status = "checked_in";
    } else if (audience === "valid_only") {
      filter.status = "valid";
    }

    const eligibleTickets = await Ticket.find(filter).select("attendeeEmail attendeeName");
    const recipientCount = eligibleTickets.length;

    // Record communication log
    const log = new CommunicationLog({
      organization: event.organization,
      event: event._id,
      sender: req.user._id,
      subject: subject.trim(),
      message: message.trim(),
      recipientCount,
      audience,
      channel: "email",
      status: "simulated",
      notes: "Email dispatch logged. Note: Real SMTP mail provider is currently in test/simulation mode.",
    });

    const savedLog = await log.save();

    return res.status(200).json({
      success: true,
      message: `Communication processed and logged for ${recipientCount} attendees. (Simulated delivery mode)`,
      log: savedLog,
      warning: "SMTP transport not configured; message saved in audit log without outgoing dispatch.",
    });
  } catch (error) {
    console.error("sendEventCommunication error:", error);
    return res.status(500).json({ message: "Internal server error sending communication." });
  }
};

/**
 * 2. List communication logs for an event
 */
const listCommunicationLogs = async (req, res) => {
  try {
    const logs = await CommunicationLog.find({ event: req.event._id })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ logs });
  } catch (error) {
    console.error("listCommunicationLogs error:", error);
    return res.status(500).json({ message: "Internal error listing communication logs." });
  }
};

module.exports = {
  sendEventCommunication,
  listCommunicationLogs,
};
