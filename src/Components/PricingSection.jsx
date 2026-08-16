import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PricingSection() {
  return (
    <div className="bg-slate-950 py-24 sm:py-32" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            اختر الباقة المناسبة لفعالياتك
          </h2>
          <p className="text-lg text-slate-400">
            ابدأ مع خططنا المرنة المصممة لتتوسع مع حجم أعمالك وتلبي كافة احتياجات تنظيم المعارض والمؤتمرات.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          
          {/* 1. Starter Plan */}
          <div className="p-8 sm:p-10 rounded-3xl border border-transparent">
            <h3 className="text-xl font-semibold text-white mb-2">الأساسية</h3>
            <p className="text-slate-400 text-sm mb-6">للفعاليات الصغيرة والورش التدريبية</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">Free</span>
              <span className="text-slate-500 text-sm ml-2">/ دائماً</span>
            </div>
            <button className="w-full py-3 px-4 rounded-lg border border-slate-700 text-white hover:bg-slate-800 transition-colors font-medium mb-8">
              ابدأ مجاناً
            </button>
            <ul className="space-y-4">
              {['تفعيل حتى 500 تذكرة', 'تطبيق مسح التذاكر الأساسي', 'دعم فني عبر البريد', 'تحليلات الحضور المبسطة'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-slate-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Premium Plan (Highlighted) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-white/10 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative scale-100 md:scale-105 z-10">
            {/* شارة التميز */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full">
              الأكثر طلباً
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">الاحترافية</h3>
            <p className="text-slate-400 text-sm mb-6">للمنظمين المحترفين والمعارض</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-slate-500 text-sm ml-2">/ شهرياً</span>
            </div>
            <button className="w-full py-3 px-4 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors font-bold mb-8 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              اشترك الآن
            </button>
            <ul className="space-y-4">
              {['عدد لا محدود من التذاكر', 'نظام إدارة البوابات المتعددة', 'تخصيص كامل لواجهة التسجيل', 'تصدير التقارير المتقدمة', 'أولوية الدعم الفني 24/7'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Business Plan */}
          <div className="p-8 sm:p-10 rounded-3xl border border-transparent">
            <h3 className="text-xl font-semibold text-white mb-2">الأعمال</h3>
            <p className="text-slate-400 text-sm mb-6">للشركات ذات الفعاليات المستمرة</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$99</span>
              <span className="text-slate-500 text-sm ml-2">/ شهرياً</span>
            </div>
            <button className="w-full py-3 px-4 rounded-lg border border-slate-700 text-white hover:bg-slate-800 transition-colors font-medium mb-8">
              اختر الباقة
            </button>
            <ul className="space-y-4">
              {['كل ميزات الباقة الاحترافية', 'أدوات إدارة العارضين (Exhibitors)', 'ربط API متقدم (Webhooks)', 'توزيع الصلاحيات لفريق العمل'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-slate-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Organizations / Enterprise */}
        <div className="mt-20 max-w-6xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-white/5 flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-between">
          <div className="flex-1 text-center lg:text-start">
            <h3 className="text-2xl font-bold text-white mb-4">خطة المؤسسات الكبرى</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto lg:mx-0">
              هل تبحث عن حلول مخصصة، دعم حصري، أو تسعير مبني على حجم فعاليات ضخم؟ دعنا نناقش خطة مصممة خصيصاً لمؤسستك.
            </p>
            <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-colors">
              تواصل مع المبيعات
            </button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[
              'مشاريع وفعاليات غير محدودة',
              'لا حدود لعمليات المسح',
              'خوادم مخصصة (Dedicated)',
              'مدير حساب شخصي',
              'فواتير مخصصة وعقود سنوية',
              'ميزات أمان متطورة (SSO)'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-500/70 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}