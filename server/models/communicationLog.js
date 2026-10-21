const mongoose = require("mongoose");

const communicationLogSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    recipientCount: {
      type: Number,
      default: 0,
    },
    audience: {
      type: String,
      default: "all_attendees",
    },
    channel: {
      type: String,
      enum: ["email", "notification"],
      default: "email",
    },
    status: {
      type: String,
      enum: ["simulated", "queued", "sent", "failed"],
      default: "simulated",
    },
    notes: {
      type: String,
      default: "Simulated log: SMTP transport is in development/simulation mode.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
