import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CalendarPlus, UserCheck, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Ease-out cubic — used to give each card a natural deceleration
 * as it slides into position from below.
 */
function easeOut(x) {
  const c = Math.max(0, Math.min(1, x));
  return 1 - Math.pow(1 - c, 4);
}

export default function HowItWorks() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // ── Scroll tracker ──────────────────────────────────────────────
  // Maps how far we've scrolled through this section (0 → 1).
  // The section is 4× viewport tall, giving ample room for the
  // three-card animation while the inner content stays sticky.
  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollTop   = window.scrollY;
    const offsetTop   = el.offsetTop;
    const scrollable  = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    setProgress(Math.max(0, Math.min(1, (scrollTop - offsetTop) / scrollable)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // ── Card animation ──────────────────────────────────────────────
  // Each card animates in during its 1/3 slice of scroll progress.
  // Cards that arrive earlier get nudged upward (and very slightly
  // scaled down) each time a later card lands on top.
  function cardStyle(idx, total) {
    const arrived = easeOut((progress - idx / total) * total);

    // Accumulate push from every card that lands *after* this one
    let push = 0;
    for (let j = idx + 1; j < total; j++) {
      push += easeOut((progress - j / total) * total);
    }

    return {
      position       : 'absolute',
      bottom         : 28,          // resting distance from viewport bottom
      left           : 0,
      right          : 0,
      zIndex         : 10 + idx,
      transformOrigin: 'bottom center',
      // translateY: card enters from 110 % below → settles at 0 %
      // nudge up: each later card pushes this one 44 px higher
      // scale: very subtle shrink as it recedes into the stack
      transform: `translateY(calc(${(1 - arrived) * 110}% - ${push * 44}px)) scale(${1 - push * 0.036})`,
      opacity: arrived > 0.02 ? 1 : 0,
    };
  }

  // ── Step data ───────────────────────────────────────────────────
  const steps = [
    {
      num      : t('howItWorks.step1Num'),
      icon     : <CalendarPlus className="w-6 h-6 text-emerald-400" />,
      title    : t('howItWorks.step1Title'),
      body     : t('howItWorks.step1Body'),
      highlight: t('howItWorks.step1Highlight'),
    },
    {
      num      : t('howItWorks.step2Num'),
      icon     : <UserCheck className="w-6 h-6 text-teal-400" />,
      title    : t('howItWorks.step2Title'),
      body     : t('howItWorks.step2Body'),
      highlight: t('howItWorks.step2Highlight'),
    },
    {
      num      : t('howItWorks.step3Num'),
      icon     : <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title    : t('howItWorks.step3Title'),
      body     : t('howItWorks.step3Body'),
      highlight: t('howItWorks.step3Highlight'),
    },
  ];

  return (
    /*
     * The section is intentionally 400 vh tall.
     * The visible UI lives inside the sticky child — the extra
     * height is purely scroll real-estate for the animation.
     */
    <section
      ref={sectionRef}
      className="bg-[#050b14] border-t border-white/5 relative"
      id="how-it-works"
      dir="rtl"
      style={{ height: '400vh' }}
    >
      {/* ── Sticky viewport panel ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Title — always visible, sits above the card stack ── */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-20 sm:pt-24 pb-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5">
            كيف يعمل
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            فعاليتك جاهزة في 3 خطوات
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            لقد صممنا المنصة لتكون الأسهل في الاستخدام. لا حاجة لخبرة تقنية معقدة،
            فقط اتبع هذه الخطوات البسيطة وستكون جاهزاً لاستقبال ضيوفك.
          </p>
        </div>

        {/* ── Cards — bottom-anchored, slide up & stack ── */}
        {steps.map((step, i) => (
          <div key={step.num} style={cardStyle(i, steps.length)}>
            <div className="max-w-3xl mx-auto px-4">
              <div className="w-full rounded-4xl bg-[#0b1120] border border-slate-800/80 p-8 sm:p-10 shadow-[0_-32px_90px_rgba(0,0,0,0.92)]">

                {/* Step number + icon */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl sm:text-6xl font-extrabold text-slate-800/60 select-none leading-none">
                    {step.num}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                </div>

                {/* Copy */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                  {step.body}
                </p>

                {/* Highlight footer */}
                <div className="mt-8 pt-5 border-t border-slate-800 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}