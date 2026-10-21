const express = require("express");
const router = express.Router();
const {
  createOrganization,
  getUserOrganizations,
  getOrganizationById,
  updateOrganization,
  listMembers,
  inviteMember,
  listInvitations,
  revokeInvitation,
  updateMemberRole,
  removeMember,
  toggleOrganizationStatus,
  toggleUserStatus,
} = require("../controllers/orgController");
const { createEvent, listOrgEvents } = require("../controllers/eventController");
const {
  authenticateUser,
  requireSuperAdmin,
  requireOrgPermission,
} = require("../middleware/authMiddleware");
const { PERMISSIONS } = require("../config/permissions");

// All organization routes require authenticated user
router.use(authenticateUser);

// User organizations
router.post("/", createOrganization);
router.get("/", getUserOrganizations);

// Super admin platform management
router.put("/:orgId/status", requireSuperAdmin, toggleOrganizationStatus);
router.put("/users/:userId/status", requireSuperAdmin, toggleUserStatus);

// Organization management (Scoped by permissions)
router.get("/:orgId", requireOrgPermission(PERMISSIONS.ORGANIZATION_READ), getOrganizationById);
router.put("/:orgId", requireOrgPermission(PERMISSIONS.ORGANIZATION_UPDATE), updateOrganization);

// Team Member & Invitation Management
router.get("/:orgId/members", requireOrgPermission(PERMISSIONS.ORGANIZATION_MEMBERS_READ), listMembers);
router.put("/:orgId/members/:memberId/role", requireOrgPermission(PERMISSIONS.ORGANIZATION_MEMBERS_MANAGE), updateMemberRole);
router.delete("/:orgId/members/:memberId", requireOrgPermission(PERMISSIONS.ORGANIZATION_MEMBERS_MANAGE), removeMember);

router.post("/:orgId/invitations", requireOrgPermission(PERMISSIONS.ORGANIZATION_INVITATIONS_MANAGE), inviteMember);
router.get("/:orgId/invitations", requireOrgPermission(PERMISSIONS.ORGANIZATION_INVITATIONS_MANAGE), listInvitations);
router.delete("/:orgId/invitations/:invitationId", requireOrgPermission(PERMISSIONS.ORGANIZATION_INVITATIONS_MANAGE), revokeInvitation);

// Organization Events
router.post("/:orgId/events", requireOrgPermission(PERMISSIONS.EVENTS_CREATE), createEvent);
router.get("/:orgId/events", requireOrgPermission(PERMISSIONS.EVENTS_READ), listOrgEvents);

module.exports = router;
