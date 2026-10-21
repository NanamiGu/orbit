const mongoose = require("mongoose");
const { ROLES } = require("../config/permissions");

const invitationSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: [
        ROLES.ORGANIZATION_OWNER,
        ROLES.EVENT_MANAGER,
        ROLES.EVENT_STAFF,
        ROLES.COMMUNICATION_MANAGER,
        ROLES.ATTENDEE,
      ],
      required: true,
      default: ROLES.EVENT_STAFF,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "revoked", "expired"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invitation", invitationSchema);
