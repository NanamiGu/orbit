const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TOKEN_KEY = "orbit_token";
const USER_KEY = "orbit_user";

/**
 * Storage helpers for authentication state
 */
export const authStorage = {
  setSession(token, user, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    if (remember) {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }

    storage.setItem(TOKEN_KEY, token);
    if (user) {
      storage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};

/**
 * Internal authenticated fetch helper
 */
async function fetchWithAuth(url, options = {}) {
  const token = authStorage.getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  /**
   * Authentication
   */
  async signup({ name, email, gender, password }) {
    return fetchWithAuth("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, gender, password }),
    });
  },

  async login({ email, password }) {
    return fetchWithAuth("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Organizations
   */
  async getOrganizations() {
    return fetchWithAuth("/api/organizations");
  },

  async createOrganization({ name, description }) {
    return fetchWithAuth("/api/organizations", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  },

  async getOrganization(orgId) {
    return fetchWithAuth(`/api/organizations/${orgId}`);
  },

  async updateOrganization(orgId, { name, description }) {
    return fetchWithAuth(`/api/organizations/${orgId}`, {
      method: "PUT",
      body: JSON.stringify({ name, description }),
    });
  },

  async getOrgMembers(orgId) {
    return fetchWithAuth(`/api/organizations/${orgId}/members`);
  },

  async inviteOrgMember(orgId, { email, role }) {
    return fetchWithAuth(`/api/organizations/${orgId}/invitations`, {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
  },

  async getOrgInvitations(orgId) {
    return fetchWithAuth(`/api/organizations/${orgId}/invitations`);
  },

  async revokeOrgInvitation(orgId, invitationId) {
    return fetchWithAuth(`/api/organizations/${orgId}/invitations/${invitationId}`, {
      method: "DELETE",
    });
  },

  async updateMemberRole(orgId, memberId, role) {
    return fetchWithAuth(`/api/organizations/${orgId}/members/${memberId}/role`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
  },

  async removeOrgMember(orgId, memberId) {
    return fetchWithAuth(`/api/organizations/${orgId}/members/${memberId}`, {
      method: "DELETE",
    });
  },

  async acceptInvitation(token) {
    return fetchWithAuth("/api/invitations/accept", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  async toggleOrgStatus(orgId, status) {
    return fetchWithAuth(`/api/organizations/${orgId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  async toggleUserStatus(userId, status) {
    return fetchWithAuth(`/api/organizations/users/${userId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Events
   */
  async getOrgEvents(orgId) {
    return fetchWithAuth(`/api/organizations/${orgId}/events`);
  },

  async createEvent(orgId, eventData) {
    return fetchWithAuth(`/api/organizations/${orgId}/events`, {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  },

  async getEvent(eventId) {
    return fetchWithAuth(`/api/events/${eventId}`);
  },

  async updateEvent(eventId, eventData) {
    return fetchWithAuth(`/api/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    });
  },

  async deleteEvent(eventId) {
    return fetchWithAuth(`/api/events/${eventId}`, {
      method: "DELETE",
    });
  },

  async getEventAssignments(eventId) {
    return fetchWithAuth(`/api/events/${eventId}/assignments`);
  },

  async assignUserToEvent(eventId, { userId, role, customPermissions }) {
    return fetchWithAuth(`/api/events/${eventId}/assignments`, {
      method: "POST",
      body: JSON.stringify({ userId, role, customPermissions }),
    });
  },

  async revokeEventAssignment(eventId, assignmentId) {
    return fetchWithAuth(`/api/events/${eventId}/assignments/${assignmentId}`, {
      method: "DELETE",
    });
  },

  /**
   * QR Check-In & Tickets
   */
  async checkInTicket(eventId, ticketCode) {
    return fetchWithAuth(`/api/events/${eventId}/checkin`, {
      method: "POST",
      body: JSON.stringify({ ticketCode }),
    });
  },

  async getEventTickets(eventId) {
    return fetchWithAuth(`/api/events/${eventId}/tickets`);
  },

  async createTicket(eventId, ticketData) {
    return fetchWithAuth(`/api/events/${eventId}/tickets`, {
      method: "POST",
      body: JSON.stringify(ticketData),
    });
  },

  async getMyTickets() {
    return fetchWithAuth("/api/tickets/my-tickets");
  },

  /**
   * Communications
   */
  async sendCommunication(eventId, { subject, message, audience }) {
    return fetchWithAuth(`/api/events/${eventId}/communications/send`, {
      method: "POST",
      body: JSON.stringify({ subject, message, audience }),
    });
  },

  async getCommunicationLogs(eventId) {
    return fetchWithAuth(`/api/events/${eventId}/communications/logs`);
  },
};
