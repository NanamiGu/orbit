/**
 * ORBIT Role-Based Access Control (RBAC) & Permissions Matrix
 */

const ROLES = {
  SUPER_ADMIN: "super_admin",
  ORGANIZATION_OWNER: "organization_owner",
  EVENT_MANAGER: "event_manager",
  EVENT_STAFF: "event_staff",
  COMMUNICATION_MANAGER: "communication_manager",
  ATTENDEE: "attendee",
};

const PERMISSIONS = {
  // Platform Permissions
  PLATFORM_MANAGE: "platform.manage",
  PLATFORM_ANALYTICS: "platform.analytics",

  // Organization Permissions
  ORGANIZATION_READ: "organization.read",
  ORGANIZATION_UPDATE: "organization.update",
  ORGANIZATION_MEMBERS_READ: "organization.members.read",
  ORGANIZATION_MEMBERS_MANAGE: "organization.members.manage",
  ORGANIZATION_INVITATIONS_MANAGE: "organization.invitations.manage",

  // Events Permissions
  EVENTS_CREATE: "events.create",
  EVENTS_READ: "events.read",
  EVENTS_UPDATE: "events.update",
  EVENTS_DELETE: "events.delete",

  // Registrations & Tickets
  REGISTRATIONS_READ: "registrations.read",
  REGISTRATIONS_MANAGE: "registrations.manage",
  TICKETS_SELF_READ: "tickets.self.read",

  // Check-In
  CHECKIN_READ: "checkin.read",
  CHECKIN_SCAN: "checkin.scan",
  CHECKIN_MANUAL: "checkin.manual",

  // Communications
  COMMUNICATIONS_READ: "communications.read",
  COMMUNICATIONS_SEND: "communications.send",

  // Analytics
  ANALYTICS_READ: "analytics.read",
};

// Base permissions granted to each role
const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),

  [ROLES.ORGANIZATION_OWNER]: [
    PERMISSIONS.ORGANIZATION_READ,
    PERMISSIONS.ORGANIZATION_UPDATE,
    PERMISSIONS.ORGANIZATION_MEMBERS_READ,
    PERMISSIONS.ORGANIZATION_MEMBERS_MANAGE,
    PERMISSIONS.ORGANIZATION_INVITATIONS_MANAGE,
    PERMISSIONS.EVENTS_CREATE,
    PERMISSIONS.EVENTS_READ,
    PERMISSIONS.EVENTS_UPDATE,
    PERMISSIONS.EVENTS_DELETE,
    PERMISSIONS.REGISTRATIONS_READ,
    PERMISSIONS.REGISTRATIONS_MANAGE,
    PERMISSIONS.CHECKIN_READ,
    PERMISSIONS.CHECKIN_SCAN,
    PERMISSIONS.CHECKIN_MANUAL,
    PERMISSIONS.COMMUNICATIONS_READ,
    PERMISSIONS.COMMUNICATIONS_SEND,
    PERMISSIONS.ANALYTICS_READ,
  ],

  [ROLES.EVENT_MANAGER]: [
    PERMISSIONS.ORGANIZATION_READ,
    PERMISSIONS.EVENTS_READ,
    PERMISSIONS.EVENTS_UPDATE,
    PERMISSIONS.REGISTRATIONS_READ,
    PERMISSIONS.REGISTRATIONS_MANAGE,
    PERMISSIONS.CHECKIN_READ,
    PERMISSIONS.CHECKIN_SCAN,
    PERMISSIONS.CHECKIN_MANUAL,
    PERMISSIONS.COMMUNICATIONS_READ,
    PERMISSIONS.ANALYTICS_READ,
  ],

  [ROLES.EVENT_STAFF]: [
    PERMISSIONS.ORGANIZATION_READ,
    PERMISSIONS.EVENTS_READ,
    PERMISSIONS.CHECKIN_READ,
    PERMISSIONS.CHECKIN_SCAN,
    PERMISSIONS.CHECKIN_MANUAL,
  ],

  [ROLES.COMMUNICATION_MANAGER]: [
    PERMISSIONS.ORGANIZATION_READ,
    PERMISSIONS.EVENTS_READ,
    PERMISSIONS.COMMUNICATIONS_READ,
    PERMISSIONS.COMMUNICATIONS_SEND,
    PERMISSIONS.REGISTRATIONS_READ,
  ],

  [ROLES.ATTENDEE]: [
    PERMISSIONS.TICKETS_SELF_READ,
  ],
};

/**
 * Checks whether a role (optionally augmented with custom permissions) contains the required permission
 */
function roleHasPermission(role, permission, customPermissions = []) {
  if (role === ROLES.SUPER_ADMIN) return true;

  const basePermissions = ROLE_PERMISSIONS[role] || [];
  if (basePermissions.includes(permission)) return true;

  return Array.isArray(customPermissions) && customPermissions.includes(permission);
}

module.exports = {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  roleHasPermission,
};
