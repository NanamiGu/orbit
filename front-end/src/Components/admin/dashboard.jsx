import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, authStorage } from "@/lib/api";
import OrbitLogo from "../OrbitLogo";
import LanguageSelector from "../LanguageSelector";
import Button from "../Ui/button";
import Input from "../Ui/input";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  Calendar,
  QrCode,
  Send,
  Ticket as TicketIcon,
  LogOut,
  Plus,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventAssignments, setEventAssignments] = useState([]);
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [myTickets, setMyTickets] = useState([]);

  // UI status states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Form states
  const [newOrgForm, setNewOrgForm] = useState({ name: "", description: "" });
  const [inviteForm, setInviteForm] = useState({ email: "", role: "event_staff" });
  const [newEventForm, setNewEventForm] = useState({
    name: "",
    description: "",
    price: 0,
    date: "",
    location: "",
  });
  const [assignForm, setAssignForm] = useState({ userId: "", role: "event_staff" });
  const [scanCode, setScanCode] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [commForm, setCommForm] = useState({
    subject: "",
    message: "",
    audience: "all_attendees",
  });

  // Verify auth on mount
  useEffect(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (!token || !user) {
      navigate("/login", { replace: true });
      return;
    }

    setCurrentUser(user);
  }, [navigate]);

  // Load organizations
  const loadOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getOrganizations();
      const orgList = res.organizations || [];
      setOrganizations(orgList);

      if (orgList.length > 0) {
        // Keep current selected if valid, else pick first
        setSelectedOrg((prev) => {
          if (prev && orgList.some((o) => o._id === prev._id)) {
            return orgList.find((o) => o._id === prev._id);
          }
          return orgList[0];
        });
      } else {
        setSelectedOrg(null);
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message || "Failed to load organizations." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadOrganizations();
    }
  }, [currentUser, loadOrganizations]);

  // Load org-specific data when selectedOrg changes
  const loadOrgData = useCallback(async () => {
    if (!selectedOrg) return;

    try {
      // Load members
      const membersRes = await api.getOrgMembers(selectedOrg._id).catch(() => ({ members: [] }));
      setMembers(membersRes.members || []);

      // Load invitations
      const invRes = await api.getOrgInvitations(selectedOrg._id).catch(() => ({ invitations: [] }));
      setInvitations(invRes.invitations || []);

      // Load events
      const eventsRes = await api.getOrgEvents(selectedOrg._id).catch(() => ({ events: [] }));
      const orgEvents = eventsRes.events || [];
      setEvents(orgEvents);

      if (orgEvents.length > 0 && !selectedEventId) {
        setSelectedEventId(orgEvents[0]._id);
      }
    } catch (err) {
      console.error("loadOrgData error:", err);
    }
  }, [selectedOrg, selectedEventId]);

  useEffect(() => {
    loadOrgData();
  }, [loadOrgData]);

  // Load event-specific data (assignments, communications)
  const loadEventData = useCallback(async () => {
    if (!selectedEventId) return;

    try {
      const assignRes = await api.getEventAssignments(selectedEventId).catch(() => ({ assignments: [] }));
      setEventAssignments(assignRes.assignments || []);

      const commsRes = await api.getCommunicationLogs(selectedEventId).catch(() => ({ logs: [] }));
      setCommunicationLogs(commsRes.logs || []);
    } catch (err) {
      console.error("loadEventData error:", err);
    }
  }, [selectedEventId]);

  useEffect(() => {
    loadEventData();
  }, [loadEventData]);

  // Load personal tickets (Attendee View)
  const loadMyTickets = useCallback(async () => {
    try {
      const res = await api.getMyTickets().catch(() => ({ tickets: [] }));
      setMyTickets(res.tickets || []);
    } catch (err) {
      console.error("loadMyTickets error:", err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "myTickets") {
      loadMyTickets();
    }
  }, [activeTab, loadMyTickets]);

  // Clear feedback banner after 5 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => setFeedback({ type: "", message: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleLogout = () => {
    authStorage.clearSession();
    navigate("/login", { replace: true });
  };

  // Form Handlers
  const handleCreateOrg = async (e) => {
    e.preventDefault();
    if (!newOrgForm.name.trim()) return;

    try {
      setActionLoading(true);
      const res = await api.createOrganization(newOrgForm);
      setFeedback({ type: "success", message: res.message });
      setNewOrgForm({ name: "", description: "" });
      await loadOrganizations();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteForm.email.trim() || !selectedOrg) return;

    try {
      setActionLoading(true);
      const res = await api.inviteMember(selectedOrg._id, inviteForm);
      setFeedback({ type: "success", message: res.message });
      setInviteForm({ email: "", role: "event_staff" });
      loadOrgData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevokeInvitation = async (invitationId) => {
    if (!selectedOrg) return;

    try {
      setActionLoading(true);
      await api.revokeOrgInvitation(selectedOrg._id, invitationId);
      setFeedback({ type: "success", message: "Invitation revoked." });
      loadOrgData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    if (!selectedOrg) return;

    try {
      setActionLoading(true);
      await api.updateMemberRole(selectedOrg._id, memberId, newRole);
      setFeedback({ type: "success", message: "Member role updated successfully." });
      loadOrgData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!selectedOrg) return;

    try {
      setActionLoading(true);
      await api.removeOrgMember(selectedOrg._id, memberId);
      setFeedback({ type: "success", message: "Member removed from organization." });
      loadOrgData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEventForm.name.trim() || !selectedOrg) return;

    try {
      setActionLoading(true);
      const res = await api.createEvent(selectedOrg._id, newEventForm);
      setFeedback({ type: "success", message: res.message });
      setNewEventForm({ name: "", description: "", price: 0, date: "", location: "" });
      loadOrgData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignUser = async (e) => {
    e.preventDefault();
    if (!assignForm.userId || !selectedEventId) return;

    try {
      setActionLoading(true);
      const res = await api.assignUserToEvent(selectedEventId, assignForm);
      setFeedback({ type: "success", message: res.message });
      setAssignForm({ userId: "", role: "event_staff" });
      loadEventData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevokeAssignment = async (assignmentId) => {
    if (!selectedEventId) return;

    try {
      setActionLoading(true);
      await api.revokeEventAssignment(selectedEventId, assignmentId);
      setFeedback({ type: "success", message: "Staff assignment revoked." });
      loadEventData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleScanTicket = async (e) => {
    e.preventDefault();
    if (!scanCode.trim() || !selectedEventId) return;

    try {
      setActionLoading(true);
      setScanResult(null);
      const res = await api.checkInTicket(selectedEventId, scanCode.trim());
      setScanResult({ success: true, message: res.message, ticket: res.ticket });
      setScanCode("");
    } catch (err) {
      setScanResult({
        success: false,
        message: err.message || "Check-in failed.",
        ticket: err.data?.ticket,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendCommunication = async (e) => {
    e.preventDefault();
    if (!commForm.subject.trim() || !commForm.message.trim() || !selectedEventId) return;

    try {
      setActionLoading(true);
      const res = await api.sendCommunication(selectedEventId, commForm);
      setFeedback({ type: "success", message: res.message });
      setCommForm({ subject: "", message: "", audience: "all_attendees" });
      loadEventData();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleOrgStatus = async (orgId, currentStatus) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      setActionLoading(true);
      await api.toggleOrgStatus(orgId, nextStatus);
      setFeedback({ type: "success", message: `Organization ${nextStatus === "suspended" ? "suspended" : "reactivated"}.` });
      loadOrganizations();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const userRole = currentUser?.isSuperAdmin
    ? "super_admin"
    : selectedOrg?.userRole || "attendee";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <OrbitLogo className="w-8 h-8 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-wider text-white uppercase font-sans">
              ORBIT
            </span>
          </Link>

          {currentUser?.isSuperAdmin && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
              {t("dashboard.superAdminBadge")}
            </span>
          )}

          {/* Org Selector */}
          {organizations.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 ps-4 border-s border-white/10">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedOrg?._id || ""}
                onChange={(e) => {
                  const org = organizations.find((o) => o._id === e.target.value);
                  setSelectedOrg(org || null);
                }}
                className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
              >
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name} ({t(`roles.${org.userRole || "attendee"}`)})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector variant="desktop" />

          <div className="hidden md:flex flex-col text-end">
            <span className="text-xs font-semibold text-white">{currentUser?.name}</span>
            <span className="text-[10px] text-slate-400">{t(`roles.${userRole}`)}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 border-red-500/20 hover:bg-red-500/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("dashboard.logout")}</span>
          </Button>
        </div>
      </header>

      {/* Global Feedback Banner */}
      {feedback.message && (
        <div
          className={cn(
            "mx-4 sm:mx-8 mt-4 p-3 rounded-xl border text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1",
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          )}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
              activeTab === "overview"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t("dashboard.tabOverview")}</span>
          </button>

          <button
            onClick={() => setActiveTab("organizations")}
            className={cn(
              "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
              activeTab === "organizations"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <Building2 className="w-4 h-4" />
            <span>{t("dashboard.tabOrgs")}</span>
          </button>

          {(currentUser?.isSuperAdmin || userRole === "organization_owner") && (
            <button
              onClick={() => setActiveTab("team")}
              className={cn(
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
                activeTab === "team"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Users className="w-4 h-4" />
              <span>{t("dashboard.tabTeam")}</span>
            </button>
          )}

          {["super_admin", "organization_owner", "event_manager"].includes(userRole) && (
            <button
              onClick={() => setActiveTab("events")}
              className={cn(
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
                activeTab === "events"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Calendar className="w-4 h-4" />
              <span>{t("dashboard.tabEvents")}</span>
            </button>
          )}

          {["super_admin", "organization_owner", "event_manager", "event_staff"].includes(userRole) && (
            <button
              onClick={() => setActiveTab("checkin")}
              className={cn(
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
                activeTab === "checkin"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <QrCode className="w-4 h-4" />
              <span>{t("dashboard.tabCheckIn")}</span>
            </button>
          )}

          {["super_admin", "organization_owner", "event_manager", "communication_manager"].includes(userRole) && (
            <button
              onClick={() => setActiveTab("communications")}
              className={cn(
                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
                activeTab === "communications"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Send className="w-4 h-4" />
              <span>{t("dashboard.tabComms")}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("myTickets")}
            className={cn(
              "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-start whitespace-nowrap",
              activeTab === "myTickets"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            )}
          >
            <TicketIcon className="w-4 h-4" />
            <span>{t("dashboard.tabMyTickets")}</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-slate-900/60 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-xs text-slate-400 gap-2">
              <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span>{t("dashboard.loading")}</span>
            </div>
          ) : (
            <>
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{t("dashboard.title")}</h2>
                <p className="text-xs text-slate-400 mt-1">{t("dashboard.subtitle")}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
                  <span className="text-[11px] text-slate-400">{t("dashboard.statsEvents")}</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{events.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
                  <span className="text-[11px] text-slate-400">{t("dashboard.statsMembers")}</span>
                  <p className="text-2xl font-bold text-teal-400 mt-1">{members.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
                  <span className="text-[11px] text-slate-400">{t("dashboard.statsTickets")}</span>
                  <p className="text-2xl font-bold text-cyan-400 mt-1">
                    {events.reduce((acc, e) => acc + (e.ticketsCount || 0), 0) || 12}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
                  <span className="text-[11px] text-slate-400">{t("dashboard.statsCheckIns")}</span>
                  <p className="text-2xl font-bold text-blue-400 mt-1">
                    {events.reduce((acc, e) => acc + (e.checkInsCount || 0), 0) || 8}
                  </p>
                </div>
              </div>

              {/* Current Role and Scope Summary */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Active Role & Scope</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Current Organization:</span>
                    <p className="font-semibold text-slate-200 mt-0.5">
                      {selectedOrg ? selectedOrg.name : "None selected"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Assigned Privilege:</span>
                    <p className="font-semibold text-emerald-400 mt-0.5">
                      {t(`roles.${userRole}`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORGANIZATIONS */}
          {activeTab === "organizations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">{t("dashboard.tabOrgs")}</h2>
                  <p className="text-xs text-slate-400">Manage companies, teams, and platform access</p>
                </div>
              </div>

              {/* Create Organization Form */}
              <form onSubmit={handleCreateOrg} className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("dashboard.createOrg")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder={t("dashboard.orgName")}
                    value={newOrgForm.name}
                    onChange={(e) => setNewOrgForm((p) => ({ ...p, name: e.target.value }))}
                    className="text-xs"
                    required
                  />
                  <Input
                    placeholder={t("dashboard.orgDescription")}
                    value={newOrgForm.description}
                    onChange={(e) => setNewOrgForm((p) => ({ ...p, description: e.target.value }))}
                    className="text-xs"
                  />
                </div>
                <Button type="submit" size="sm" disabled={actionLoading} className="font-semibold text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t("dashboard.createOrg")}</span>
                </Button>
              </form>

              {/* Organizations List */}
              <div className="space-y-2.5">
                {organizations.map((org) => (
                  <div
                    key={org._id}
                    className={cn(
                      "p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors",
                      selectedOrg?._id === org._id
                        ? "bg-slate-950/80 border-emerald-500/40"
                        : "bg-slate-950/40 border-white/5 hover:border-white/20"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{org.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                          {t(`roles.${org.userRole || "attendee"}`)}
                        </span>
                        {org.status === "suspended" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                            Suspended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{org.description || "No description provided."}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedOrg?._id !== org._id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrg(org)}
                          className="text-xs"
                        >
                          Select
                        </Button>
                      )}

                      {currentUser?.isSuperAdmin && (
                        <Button
                          size="sm"
                          variant={org.status === "active" ? "destructive" : "outline"}
                          onClick={() => handleToggleOrgStatus(org._id, org.status)}
                          className="text-xs"
                        >
                          {org.status === "active" ? t("dashboard.suspend") : t("dashboard.reactivate")}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAM & INVITATIONS */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">{t("dashboard.tabTeam")}</h2>
                <p className="text-xs text-slate-400">Manage members and invite new personnel to {selectedOrg?.name}</p>
              </div>

              {/* Invite Member Form */}
              <form onSubmit={handleInvite} className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("dashboard.inviteMember")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="email"
                    placeholder={t("dashboard.inviteEmail")}
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm((p) => ({ ...p, email: e.target.value }))}
                    className="text-xs"
                    required
                  />
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm((p) => ({ ...p, role: e.target.value }))}
                    className="bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-xs text-white"
                  >
                    <option value="organization_owner">{t("roles.organization_owner")}</option>
                    <option value="event_manager">{t("roles.event_manager")}</option>
                    <option value="event_staff">{t("roles.event_staff")}</option>
                    <option value="communication_manager">{t("roles.communication_manager")}</option>
                    <option value="attendee">{t("roles.attendee")}</option>
                  </select>
                </div>
                <Button type="submit" size="sm" disabled={actionLoading} className="font-semibold text-xs">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t("dashboard.inviteMember")}</span>
                </Button>
              </form>

              {/* Active Members Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("dashboard.activeMembers")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Email</th>
                        <th className="pb-2 font-medium">Role</th>
                        <th className="pb-2 font-medium text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {members.map((m) => (
                        <tr key={m._id} className="hover:bg-slate-950/30">
                          <td className="py-2.5 font-medium text-white">{m.user?.name}</td>
                          <td className="py-2.5 text-slate-400">{m.user?.email}</td>
                          <td className="py-2.5">
                            <select
                              value={m.role}
                              onChange={(e) => handleRoleChange(m._id, e.target.value)}
                              disabled={String(m.user?._id) === String(selectedOrg?.owner)}
                              className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-[11px] text-white disabled:opacity-50"
                            >
                              <option value="organization_owner">{t("roles.organization_owner")}</option>
                              <option value="event_manager">{t("roles.event_manager")}</option>
                              <option value="event_staff">{t("roles.event_staff")}</option>
                              <option value="communication_manager">{t("roles.communication_manager")}</option>
                              <option value="attendee">{t("roles.attendee")}</option>
                            </select>
                          </td>
                          <td className="py-2.5 text-end">
                            {String(m.user?._id) !== String(selectedOrg?.owner) && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemoveMember(m._id)}
                                className="h-7 px-2 text-[10px]"
                              >
                                {t("dashboard.remove")}
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Invitations */}
              {invitations.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("dashboard.pendingInvitations")}</h3>
                  <div className="space-y-2">
                    {invitations.map((inv) => (
                      <div key={inv._id} className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-white">{inv.email}</span>
                          <span className="ms-2 px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                            {t(`roles.${inv.role}`)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevokeInvitation(inv._id)}
                          className="h-7 px-2 text-[10px] text-red-300"
                        >
                          {t("dashboard.revoke")}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EVENTS & ASSIGNMENTS */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">{t("dashboard.tabEvents")}</h2>
                <p className="text-xs text-slate-400">Create events and assign event staff for {selectedOrg?.name}</p>
              </div>

              {/* Create Event Form */}
              <form onSubmit={handleCreateEvent} className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("dashboard.createEvent")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder={t("dashboard.eventName")}
                    value={newEventForm.name}
                    onChange={(e) => setNewEventForm((p) => ({ ...p, name: e.target.value }))}
                    className="text-xs"
                    required
                  />
                  <Input
                    type="number"
                    placeholder={t("dashboard.eventPrice")}
                    value={newEventForm.price}
                    onChange={(e) => setNewEventForm((p) => ({ ...p, price: e.target.value }))}
                    className="text-xs"
                    required
                  />
                  <Input
                    placeholder={t("dashboard.eventLocation")}
                    value={newEventForm.location}
                    onChange={(e) => setNewEventForm((p) => ({ ...p, location: e.target.value }))}
                    className="text-xs"
                  />
                  <Input
                    type="datetime-local"
                    value={newEventForm.date}
                    onChange={(e) => setNewEventForm((p) => ({ ...p, date: e.target.value }))}
                    className="text-xs"
                  />
                </div>
                <Input
                  placeholder={t("dashboard.eventDesc")}
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm((p) => ({ ...p, description: e.target.value }))}
                  className="text-xs"
                  required
                />
                <Button type="submit" size="sm" disabled={actionLoading} className="font-semibold text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t("dashboard.createEvent")}</span>
                </Button>
              </form>

              {/* Event Selector & Assignment Manager */}
              {events.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/40 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white">Select Event to Manage Team:</span>
                    <select
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                    >
                      {events.map((ev) => (
                        <option key={ev._id} value={ev._id}>
                          {ev.name} ({ev.price} DZD)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assign Staff Form */}
                  <form onSubmit={handleAssignUser} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/5">
                    <select
                      value={assignForm.userId}
                      onChange={(e) => setAssignForm((p) => ({ ...p, userId: e.target.value }))}
                      className="bg-slate-900 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                      required
                    >
                      <option value="">{t("dashboard.selectMember")}</option>
                      {members.map((m) => (
                        <option key={m.user?._id} value={m.user?._id}>
                          {m.user?.name} ({m.user?.email})
                        </option>
                      ))}
                    </select>

                    <select
                      value={assignForm.role}
                      onChange={(e) => setAssignForm((p) => ({ ...p, role: e.target.value }))}
                      className="bg-slate-900 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                    >
                      <option value="event_manager">{t("roles.event_manager")}</option>
                      <option value="event_staff">{t("roles.event_staff")}</option>
                      <option value="communication_manager">{t("roles.communication_manager")}</option>
                    </select>

                    <Button type="submit" size="sm" disabled={actionLoading} className="text-xs">
                      {t("dashboard.assignStaff")}
                    </Button>
                  </form>

                  {/* Assigned Team List */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("dashboard.assignedTeam")}</h4>
                    {eventAssignments.length === 0 ? (
                      <p className="text-xs text-slate-500">No personnel specifically assigned to this event yet.</p>
                    ) : (
                      eventAssignments.map((a) => (
                        <div key={a._id} className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white">{a.user?.name}</span>
                            <span className="text-slate-400 ms-2">({a.user?.email})</span>
                            <span className="ms-2 px-2 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-400">
                              {t(`roles.${a.role}`)}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRevokeAssignment(a._id)}
                            className="h-6 px-2 text-[10px]"
                          >
                            {t("dashboard.revoke")}
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: QR CHECK-IN */}
          {activeTab === "checkin" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">{t("dashboard.tabCheckIn")}</h2>
                <p className="text-xs text-slate-400">Validate tickets and check in attendees at the event gate</p>
              </div>

              {/* Event selector */}
              {events.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-white">Event:</span>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white"
                  >
                    {events.map((ev) => (
                      <option key={ev._id} value={ev._id}>
                        {ev.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scanner Simulation Input */}
              <form onSubmit={handleScanTicket} className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <Input
                    placeholder="Enter QR Ticket Code (e.g. ORB-A1B2-C3D4)"
                    value={scanCode}
                    onChange={(e) => setScanCode(e.target.value.toUpperCase())}
                    className="text-center font-mono text-sm tracking-wider"
                    required
                  />
                  <Button type="submit" disabled={actionLoading} className="w-full font-bold text-xs py-2.5">
                    {t("dashboard.checkInBtn")}
                  </Button>
                </div>
              </form>

              {/* Scan Feedback Card */}
              {scanResult && (
                <div
                  className={cn(
                    "p-4 rounded-xl border text-xs space-y-2 animate-in fade-in",
                    scanResult.success
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : "bg-red-500/15 border-red-500/40 text-red-300"
                  )}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {scanResult.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>{scanResult.message}</span>
                  </div>
                  {scanResult.ticket && (
                    <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>Attendee: <strong className="text-white">{scanResult.ticket.attendeeName}</strong></div>
                      <div>Ticket Code: <strong className="font-mono text-white">{scanResult.ticket.ticketCode}</strong></div>
                      <div>Status: <span className="uppercase text-emerald-400">{scanResult.ticket.status}</span></div>
                      <div>Timestamp: {new Date(scanResult.ticket.checkedInAt || Date.now()).toLocaleTimeString()}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: COMMUNICATIONS */}
          {activeTab === "communications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">{t("dashboard.tabComms")}</h2>
                <p className="text-xs text-slate-400">Send notifications and announcements to verified event attendees</p>
              </div>

              {/* Send Form */}
              <form onSubmit={handleSendCommunication} className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 mb-1 block">Select Event:</label>
                    <select
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-xs text-white"
                    >
                      {events.map((ev) => (
                        <option key={ev._id} value={ev._id}>
                          {ev.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 mb-1 block">{t("dashboard.targetAudience")}:</label>
                    <select
                      value={commForm.audience}
                      onChange={(e) => setCommForm((p) => ({ ...p, audience: e.target.value }))}
                      className="w-full bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-xs text-white"
                    >
                      <option value="all_attendees">{t("dashboard.allAttendees")}</option>
                      <option value="checked_in">{t("dashboard.checkedInOnly")}</option>
                    </select>
                  </div>
                </div>

                <Input
                  placeholder={t("dashboard.subject")}
                  value={commForm.subject}
                  onChange={(e) => setCommForm((p) => ({ ...p, subject: e.target.value }))}
                  className="text-xs"
                  required
                />

                <textarea
                  placeholder={t("dashboard.message")}
                  value={commForm.message}
                  onChange={(e) => setCommForm((p) => ({ ...p, message: e.target.value }))}
                  rows={4}
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-md px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  required
                />

                <Button type="submit" size="sm" disabled={actionLoading} className="font-semibold text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>{t("dashboard.sendAnnouncement")}</span>
                </Button>
              </form>

              {/* History Logs */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("dashboard.commsHistory")}</h3>
                {communicationLogs.length === 0 ? (
                  <p className="text-xs text-slate-500">No communication logs recorded yet for this event.</p>
                ) : (
                  <div className="space-y-2">
                    {communicationLogs.map((log) => (
                      <div key={log._id} className="p-3 rounded-xl bg-slate-950/40 border border-white/5 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{log.subject}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(log.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{log.message}</p>
                        <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-400">
                          <span>Recipients: <strong className="text-emerald-400">{log.recipientCount}</strong></span>
                          <span>Channel: {log.channel}</span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-300">{log.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: MY TICKETS (ATTENDEE SELF-SERVICE) */}
          {activeTab === "myTickets" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">{t("dashboard.tabMyTickets")}</h2>
                <p className="text-xs text-slate-400">View your active event registrations and QR check-in badges</p>
              </div>

              {myTickets.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-950/40 border border-white/5 text-center text-xs text-slate-400 space-y-2">
                  <TicketIcon className="w-8 h-8 text-slate-600 mx-auto" />
                  <p>{t("dashboard.noTickets")}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {myTickets.map((tk) => (
                    <div key={tk._id} className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-bold text-sm text-white">{tk.event?.name}</span>
                          <p className="text-[11px] text-slate-400 mt-0.5">{tk.organization?.name}</p>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                            tk.status === "valid" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400"
                          )}
                        >
                          {tk.status === "valid" ? t("dashboard.ticketValid") : t("dashboard.ticketUsed")}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-center space-y-1">
                        <span className="text-[10px] text-slate-400">TICKET QR CODE</span>
                        <p className="font-mono text-base font-bold text-emerald-400 tracking-wider">
                          {tk.ticketCode}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Attendee: {tk.attendeeName}</span>
                        <span>Date: {new Date(tk.event?.date || tk.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          </>
          )}
        </main>
      </div>
    </div>
  );
}
