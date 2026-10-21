const mongoose = require("mongoose");
const { ROLES } = require("../config/permissions");

const eventAssignmentSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: {
      type: String,
      enum: [
        ROLES.EVENT_MANAGER,
        ROLES.EVENT_STAFF,
        ROLES.COMMUNICATION_MANAGER,
      ],
      required: true,
    },
    customPermissions: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Prevent duplicate assignments for the same user on the same event
eventAssignmentSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("EventAssignment", eventAssignmentSchema);
