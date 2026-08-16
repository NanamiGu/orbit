import React, { useState } from 'react';
import { X, CheckCircle2, ArrowLeft, ArrowRight, Phone, Mail, Building, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OrbitLogo from './OrbitLogo';

export default function ActionModal({ isOpen, onClose, initialIntent = "" }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventName: "",
    attendees: "100-500",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      eventName: "",
      attendees: "100-500",
    });
    onClose();
  };

  const isContactIntent = initialIntent.toLowerCase().includes("تواصل") || 
                          initialIntent.toLowerCase().includes("contact");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden text-start"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors`}
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <OrbitLogo className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {isContactIntent ? t("modal.titleContact") : t("modal.titleTrial")}
                </h3>
                <p className="text-xs text-slate-400">
                  {isContactIntent ? t("modal.subtitleContact") : t("modal.subtitleTrial")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t("modal.nameLabel")}
                </label>
                <div className="relative">
                  <User className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-3.5 pointer-events-none`} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("modal.namePlaceholder")}
                    className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t("modal.phoneLabel")}
                  </label>
                  <div className="relative">
                    <Phone className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-3.5 pointer-events-none`} />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05 / 06 / 07 XX XX XX"
                      className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors font-mono-num`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t("modal.emailLabel")}
                  </label>
                  <div className="relative">
                    <Mail className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-3.5 pointer-events-none`} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.dz"
                      className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors font-sans`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t("modal.eventLabel")}
                </label>
                <div className="relative">
                  <Building className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-3.5 pointer-events-none`} />
                  <input
                    type="text"
                    required
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    placeholder={t("modal.eventPlaceholder")}
                    className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t("modal.attendeesLabel")}
                </label>
                <select
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                >
                  <option value="1-100">{t("modal.opt1")}</option>
                  <option value="100-500">{t("modal.opt2")}</option>
                  <option value="500-1000">{t("modal.opt3")}</option>
                  <option value="1000+">{t("modal.opt4")}</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t("modal.submitBtn")}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t("modal.successTitle")}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              {formData.name ? `${formData.name} — ` : ''}{t("modal.successMsg")}
            </p>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 text-xs text-emerald-400 mb-6">
              {t("modal.whatsappAlert")}: {formData.phone}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
            >
              {t("modal.backBtn")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
