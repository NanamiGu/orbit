import React from 'react';
import { ArrowLeft, ArrowRight, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FinalCTA({ onOpenActionModal }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-slate-950 py-24 sm:py-32 relative overflow-hidden" id="contact">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-10 sm:p-14 lg:p-16 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-emerald-500/30 text-center shadow-2xl backdrop-blur-xl">
          
          {/* Subtle top light bar */}
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.25] max-w-3xl mx-auto">
            {t("finalCta.headline")}
          </h2>

          {/* Subline */}
          <p className="text-base sm:text-lg text-slate-300 font-light mb-6 max-w-2xl mx-auto">
            {t("finalCta.subline")}
          </p>

          {/* Supporting micro-copy banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium mb-10">
            <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t("finalCta.microCopy")}</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenActionModal ? onOpenActionModal(t("finalCta.ctaPrimary")) : null}
              className="w-full sm:w-auto px-9 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>{t("finalCta.ctaPrimary")}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onOpenActionModal ? onOpenActionModal(t("finalCta.ctaSecondary")) : null}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{t("finalCta.ctaSecondary")}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
