const crypto = require("crypto");
const mongoose = require("mongoose");
const Ticket = require("../models/ticket");

/**
 * 1. Atomic QR Check-in verification
 */
const scanCheckInTicket = async (req, res) => {
  try {
    const { ticketCode } = req.body;
    const event = req.event;

    if (!ticketCode || typeof ticketCode !== "string" || !ticketCode.trim()) {
      return res.status(400).json({ message: "Ticket code is required for check-in." });
    }

    const cleanCode = ticketCode.trim().toUpperCase();

    // Atomic find-and-update to strictly prevent double check-ins or concurrent race conditions
    const updatedTicket = await Ticket.findOneAndUpdate(
      {
        ticketCode: cleanCode,
        event: event._id,
        status: "valid",
      },
      {
        $set: {
          status: "checked_in",
          checkedInAt: new Date(),
          checkedInBy: req.user._id,
        },
      },
      { returnDocument: "after" }
    );

    if (updatedTicket) {
      // Return safe, minimal operational attendee info for staff badge/gate validation
      return res.status(200).json({
        success: true,
        message: "Check-in successful! Access granted.",
        ticket: {
          ticketCode: updatedTicket.ticketCode,
          attendeeName: updatedTicket.attendeeName,
          status: updatedTicket.status,
          checkedInAt: updatedTicket.checkedInAt,
        },
      });
    }

    // Ticket was not updated: Diagnose exact reason to return precise error response
    const existingTicket = await Ticket.findOne({ ticketCode: cleanCode });

    if (!existingTicket) {
      return res.status(404).json({
        success: false,
        message: "Invalid ticket code. Ticket does not exist.",
      });
    }

    if (String(existingTicket.event) !== String(event._id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket: This ticket belongs to a different event.",
      });
    }

    if (existingTicket.status === "checked_in") {
      return res.status(409).json({
        success: false,
        message: `Ticket already checked in at ${existingTicket.checkedInAt?.toISOString() || "earlier"}.`,
        ticket: {
          ticketCode: existingTicket.ticketCode,
          attendeeName: existingTicket.attendeeName,
          status: existingTicket.status,
          checkedInAt: existingTicket.checkedInAt,
        },
      });
    }

    if (existingTicket.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "This ticket has been cancelled or invalidated.",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Ticket is not in a valid state for check-in.",
    });
  } catch (error) {
    console.error("scanCheckInTicket error:", error);
    return res.status(500).json({ message: "Internal server error during check-in." });
  }
};

/**
 * 2. Create ticket / attendee registration
 */
const createTicket = async (req, res) => {
  try {
    const { attendeeName, attendeeEmail } = req.body;
    const event = req.event;

    if (!attendeeName || !attendeeName.trim() || !attendeeEmail || !attendeeEmail.trim()) {
      return res.status(400).json({ message: "Attendee name and email are required." });
    }

    // Generate unique ticket code: ORB-XXXX-XXXX
    const rawRandom = crypto.randomBytes(4).toString("hex").toUpperCase();
    const rawRandom2 = crypto.randomBytes(4).toString("hex").toUpperCase();
    const ticketCode = `ORB-${rawRandom}-${rawRandom2}`;

    const ticket = new Ticket({
      event: event._id,
      organization: event.organization,
      attendee: req.user._id,
      attendeeName: attendeeName.trim(),
      attendeeEmail: attendeeEmail.trim().toLowerCase(),
      ticketCode,
      status: "valid",
    });

    const savedTicket = await ticket.save();

    return res.status(201).json({
      message: "Ticket created successfully.",
      ticket: savedTicket,
    });
  } catch (error) {
    console.error("createTicket error:", error);
    return res.status(500).json({ message: "Internal error creating ticket." });
  }
};

/**
 * 3. List tickets for an event
 */
const listEventTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ event: req.event._id })
      .select("ticketCode attendeeName attendeeEmail status checkedInAt createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({ tickets });
  } catch (error) {
    console.error("listEventTickets error:", error);
    return res.status(500).json({ message: "Internal error listing tickets." });
  }
};

/**
 * 4. Get current user's registered tickets (Attendee self-service)
 */
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      $or: [
        { attendee: req.user._id },
        { attendeeEmail: req.user.email.toLowerCase() },
      ],
    })
      .populate("event", "name date location price description")
      .populate("organization", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({ tickets });
  } catch (error) {
    console.error("getMyTickets error:", error);
    return res.status(500).json({ message: "Internal error retrieving attendee tickets." });
  }
};

module.exports = {
  scanCheckInTicket,
  createTicket,
  listEventTickets,
  getMyTickets,
};
