import React from 'react';
import { Presentation, GraduationCap, Store, Building2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhoItsFor() {
  const { t } = useTranslation();

  const audiences = [
    {
      icon: <Presentation className="w-6 h-6 text-emerald-400" />,
      audience: t("whoItsFor.aud1Title"),
      description: t("whoItsFor.aud1Desc"),
      badge: t("whoItsFor.aud1Badge"),
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-teal-400" />,
      audience: t("whoItsFor.aud2Title"),
      description: t("whoItsFor.aud2Desc"),
      badge: t("whoItsFor.aud2Badge"),
    },
    {
      icon: <Store className="w-6 h-6 text-cyan-400" />,
      audience: t("whoItsFor.aud3Title"),
      description: t("whoItsFor.aud3Desc"),
      badge: t("whoItsFor.aud3Badge"),
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-400" />,
      audience: t("whoItsFor.aud4Title"),
      description: t("whoItsFor.aud4Desc"),
      badge: t("whoItsFor.aud4Badge"),
    },
  ];

  return (
    <section className="bg-slate-950 py-24 sm:py-32 relative border-t border-white/5" id="who-its-for">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>{t("whoItsFor.label")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {t("whoItsFor.headline")}
          </h2>
        </div>

        {/* 4 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-white/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 text-start">
                  {item.audience}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed text-start">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("whoItsFor.cardFooter")}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
