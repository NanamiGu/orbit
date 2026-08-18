import React from 'react';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PricingSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const tiers = [
    {
      name: t("pricing.t1Name"),
      price: t("pricing.t1Price"),
      period: "",
      target: t("pricing.t1Target"),
      highlighted: false,
      cta: t("pricing.t1Cta"),
      features: [
        t("pricing.t1F1"),
        t("pricing.t1F2"),
        t("pricing.t1F3"),
        t("pricing.t1F4"),
      ],
    },
    {
      name: t("pricing.t2Name"),
      price: t("pricing.t2Price"),
      period: t("pricing.t2Period"),
      target: t("pricing.t2Target"),
      highlighted: true,
      badge: t("pricing.t2Badge"),
      cta: t("pricing.t2Cta"),
      features: [
        t("pricing.t2F1"),
        t("pricing.t2F2"),
        t("pricing.t2F3"),
        t("pricing.t2F4"),
        t("pricing.t2F5"),
        t("pricing.t2F6"),
      ],
    },
    {
      name: t("pricing.t3Name"),
      price: t("pricing.t3Price"),
      period: "",
      target: t("pricing.t3Target"),
      highlighted: false,
      cta: t("pricing.t3Cta"),
      features: [
        t("pricing.t3F1"),
        t("pricing.t3F2"),
        t("pricing.t3F3"),
        t("pricing.t3F4"),
        t("pricing.t3F5"),
      ],
    },
  ];

  return (
    <section className="bg-slate-950 py-24 sm:py-32 relative border-t border-white/5" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>{t("pricing.label")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {t("pricing.headline")}
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            {t("pricing.subline")}
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                tier.highlighted
                  ? "bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-emerald-400 shadow-2xl shadow-emerald-500/10 lg:-translate-y-2"
                  : "bg-slate-900/50 border border-white/10 hover:border-white/20"
              }`}
            >
              {/* Highlight Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 text-slate-950 text-xs font-extrabold shadow-md uppercase tracking-wider">
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2 text-start">
                  {tier.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-6 text-start">
                  {tier.target}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-white/10 text-start">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono-num">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm font-medium text-slate-400">
                        {tier.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-200 text-start">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          tier.highlighted
                            ? "bg-emerald-400/20 text-emerald-400"
                            : "bg-white/10 text-slate-300"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-3" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA Button */}
              <a
                href="https://wa.me/213550000000"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  tier.highlighted
                    ? "bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                    : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Enterprise Note */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <p className="text-sm sm:text-base text-slate-300 font-medium mb-3">
            {t("pricing.enterpriseNote")}
          </p>
          <a
            href="https://wa.me/213550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{t("pricing.enterpriseCta")}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}