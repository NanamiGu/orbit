const mongoose = require("mongoose");
const { ROLES } = require("../config/permissions");

const organizationMembershipSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Prevent duplicate memberships for the same user in the same organization
organizationMembershipSchema.index({ organization: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("OrganizationMembership", organizationMembershipSchema);
