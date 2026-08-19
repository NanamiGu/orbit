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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  z-10 sticky top-24">
        
        {/* القسم الأول: العنوان في الأعلى وفي المنتصف */}
        <div className="text-center  max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex  items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span>كيف يعمل</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            فعاليتك جاهزة في 3 خطوات
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            لقد صممنا المنصة لتكون الأسهل في الاستخدام. لا حاجة لخبرة تقنية معقدة، فقط اتبع هذه الخطوات البسيطة وستكون جاهزاً لاستقبال ضيوفك.
          </p>
        </div>

        {/* القسم الثاني: البطاقات في المنتصف تحت العنوان تتراكم فوق بعضها */}
        {/* استخدمنا max-w-4xl لكي لا تكون البطاقات عريضة جداً ومزعجة للعين */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 sm:gap-8 relative pb-24">
            {steps.map((step, index) => (
              <div
                key={step.num}
                // البطاقات تملك خاصية sticky لكي تتراكم 
                className="group p-8 sm:p-10 rounded-3xl bg-slate-900 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between shadow-2xl sticky"
                style={{
                  // تتوقف البطاقات تحت شريط التصفح (بمسافة 6rem) وتتراكم بمقدار 1.5rem
                  top: `calc(22rem + ${index * 1.5}rem)`,
                  zIndex: index + 10,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-700 group-hover:text-emerald-400/80 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-start">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 text-start">
                    {step.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <Clock className="w-4 h-4" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}