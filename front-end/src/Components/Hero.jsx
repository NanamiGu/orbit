import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = i18n.language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-28 pb-20 md:pt-36 md:pb-28">
      
      {/* المؤثرات البصرية الخلفية (Abstract Orbit Concentric Spinning Circles) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-212.5 h-212.5 rounded-full border border-white/5 shadow-[0_0_100px_rgba(6,182,212,0.04)] animate-[spin_70s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-170 h-170 rounded-full border border-white/5 shadow-[0_0_80px_rgba(6,182,212,0.05)] animate-[spin_55s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130 h-130 rounded-full border border-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.08)] animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-90 h-90 rounded-full border border-cyan-500/10 shadow-[0_0_60px_rgba(6,182,212,0.12)] animate-[spin_25s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full border border-teal-500/15 shadow-[0_0_50px_rgba(20,184,166,0.15)] animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

      {/* هالات مضيئة خفيفة */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-75 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-100 h-62.5 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* المحتوى الرئيسي (متمركز في المنتصف) */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >

        {/* العنوان الرئيسي */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-3xl">
          {t('hero.titleLine1')} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400">
            {t('hero.titleLine2')}
          </span>
        </h1>

        {/* الوصف بالفرنسية / الفرعي */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300 mb-3 font-normal">
          {t('hero.subline')}
        </p>

        {/* النص التوضيحي المصغر */}
        <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide mb-10">
          {t('hero.microCopy')}
        </p>

        {/* أزرار الإجراءات (CTAs) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 rounded-xl text-base font-bold transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{t('hero.ctaPrimary')}</span>
            <ArrowIcon className="w-5 h-5" />
          </a>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 hover:border-white/20 rounded-xl text-base font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>{t('hero.ctaSecondary')}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>

        {/* مؤشرات الطمأنينة السريعة */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-400 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('hero.setupTime')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('hero.anyPhone')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('hero.localSupport')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}