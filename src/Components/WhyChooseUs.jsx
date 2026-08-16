import React from 'react';
import { QrCode, MessageSquare, BarChart3, SlidersVertical } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: <SlidersVertical strokeWidth={2}  className="w-6 h-6 text-cyan-400" />,
      title: "تخصيص كامل",
      description: "صمم واجهة التسجيل وأنواع التذاكر لتطابق هوية فعاليتك وعلامتك التجارية بسهولة تامة."
    },
    {
      icon: <QrCode strokeWidth={2}  className="w-6 h-6 text-blue-400" />,
      title: "دخول ذكي وسريع",
      description: "مسح تذاكر الحضور بلمح البصر عبر تطبيق الهواتف المخصص للموظفين لضمان عدم وجود طوابير."
    },
    {
      icon: <MessageSquare strokeWidth={2}      className="w-6 h-6 text-emerald-400" />,
      title: "تواصل آلي",
      description: "إرسال تأكيدات، تذاكر، ورسائل تذكير تلقائياً عبر البريد الإلكتروني وواتساب للمشاركين."
    },
    {
      icon: <BarChart3 strokeWidth={2} className="w-6 h-6 text-purple-400" />,
      title: "تقارير متقدمة",
      description: "تتبع المبيعات، ومعدلات الحضور، وأداء البوابات لحظة بلحظة عبر لوحة تحكم تفاعلية."
    }
  ];

  return (
    <section className="bg-slate-950 py-24 sm:py-32" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* حاوية التقسيم: النص في جهة، والبطاقات في جهة */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
          
          {/* العمود الأول (النص التعريفي) - يأخذ ثلث المساحة */}
          <div className="w-full lg:w-1/3 flex flex-col items-start text-start lg:sticky lg:top-32">
            
            {/* الشارة العلوية (Badge) مطابقة للصورة */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 text-slate-300 text-sm font-medium mb-8 bg-white/5">
              ORBIT FEATURES
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.2] mb-6 tracking-tight">
              نظام تشغيل <br /> متكامل لفعالياتك
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed">
              من مرحلة التسجيل وحتى التحليلات البعدية، أوربت توفر لك كل ما تحتاجه لإدارة معارضك ومؤتمراتك في مكان واحد، مما يغنيك عن استخدام أدوات وتطبيقات مشتتة.
            </p>
          </div>

          {/* العمود الثاني (شبكة البطاقات) - يأخذ ثلثي المساحة */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-white/10 hover:bg-slate-900/60 transition-colors group"
                >
                  <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}