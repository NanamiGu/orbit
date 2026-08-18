import React from 'react';
import { QrCode, Globe, MessageCircle, BarChart3, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      id: "qr-checkin",
      icon: <QrCode className="w-6 h-6 text-emerald-400" />,
      title: t("features.f1Title"),
      body: t("features.f1Body"),
      accent: "from-emerald-500/20 to-emerald-500/5",
      borderAccent: "hover:border-emerald-500/40",
    },
    {
      id: "registration",
      icon: <Globe className="w-6 h-6 text-teal-400" />,
      title: t("features.f2Title"),
      body: t("features.f2Body"),
      accent: "from-teal-500/20 to-teal-500/5",
      borderAccent: "hover:border-teal-500/40",
      
    },
    {
      id: "whatsapp",
      icon: <MessageCircle className="w-6 h-6 text-cyan-400" />,
      title: t("features.f3Title"),
      body: t("features.f3Body"),
      accent: "from-cyan-500/20 to-cyan-500/5",
      borderAccent: "hover:border-cyan-500/40",
    },
    {
      id: "live-dashboard",
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
      title: t("features.f4Title"),
      body: t("features.f4Body"),
      accent: "from-blue-500/20 to-blue-500/5",
      borderAccent: "hover:border-blue-500/40",
    },
  ];

  return (
    <section className="bg-slate-950 py-24 sm:py-32 relative overflow-hidden" id="features">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          
          {/* Section label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>{t("features.label")}</span>
          </div>

          {/* Section headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {t("features.headline")}
          </h2>

          {/* Section subline */}
          <p className="text-base sm:text-lg text-slate-400 font-light">
            {t("features.subline")}
          </p>
        </div>

        {/* 2x2 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className={`group relative p-8 sm:p-10 rounded-3xl bg-linear-to-b from-slate-900/80 to-slate-900/40 border border-white/10 ${item.borderAccent} transition-all duration-300 hover:shadow-2xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {item.tag}
                  </span>
                </div>

                {/* Feature Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 text-start">
                  {item.title}
                </h3>

                {/* Feature Body */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-start">
                  {item.body}
                </p>
              </div>

              {/* Feature Interactive Preview */}
              {item.preview}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
