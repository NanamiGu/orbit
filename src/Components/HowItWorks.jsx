import React from 'react';
import { CalendarPlus, UserCheck, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      num: t("howItWorks.step1Num"),
      icon: <CalendarPlus className="w-6 h-6 text-emerald-400" />,
      title: t("howItWorks.step1Title"),
      body: t("howItWorks.step1Body"),
      highlight: t("howItWorks.step1Highlight"),
    },
    {
      num: t("howItWorks.step2Num"),
      icon: <UserCheck className="w-6 h-6 text-teal-400" />,
      title: t("howItWorks.step2Title"),
      body: t("howItWorks.step2Body"),
      highlight: t("howItWorks.step2Highlight"),
    },
    {
      num: t("howItWorks.step3Num"),
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: t("howItWorks.step3Title"),
      body: t("howItWorks.step3Body"),
      highlight: t("howItWorks.step3Highlight"),
    },
  ];

  return (
    <section className="bg-slate-950 py-24 sm:py-32 relative border-t border-white/5" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>{t("howItWorks.label")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {t("howItWorks.headline")}
          </h2>
        </div>

        {/* 3 Connected Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative p-8 sm:p-9 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Step number badge & icon */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono-num text-slate-700 group-hover:text-emerald-400/80 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-2xl font-bold text-white mb-4 text-start">
                  {step.title}
                </h3>

                {/* Step Body */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 text-start">
                  {step.body}
                </p>
              </div>

              {/* Step Footnote Tag */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
