import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Activity, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  CheckCircle2, 
  ArrowLeft
} from 'lucide-react';
import OrbitLogo from './OrbitLogo';

export default function AboutOrbit() {
  const storySteps = [
    {
      num: "01",
      title: "بحث وتطوير مكثف ومستمر",
      desc: "أدركنا أن منظمي الفعاليات يعانون من تشتت الأدوات والمنصات غير المتوافقة. لذلك بنينا منصة SaaS متكاملة تدير دورة حياة الفعالية بالكامل من مرحلة التسجيل وحتى إصدار التقارير البعدية المعمقة.",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    },
    {
      num: "02",
      title: "إدارة الحشود والدخول الذكي",
      desc: "طورنا نظام مسح تذاكر فائق السرعة عبر تطبيق الجوال المخصص لطواقم الاستقبال، مزود بخوارزميات تحقق أوفلاين وأونلاين لضمان انعدام الطوابير عند بوابات الدخول.",
      icon: <Smartphone className="w-5 h-5 text-blue-400" />,
    },
    {
      num: "03",
      title: "متابعة وتحليلات لحظية للبيانات",
      desc: "لوحة تحكم حية 24/7 لا داعي لانتظار انتهاء الفعالية لتقييم النتائج. توفر أوربت لوحة تحكم حية تعرض أعداد الحضور، التذاكر الممسوحة، وأوقات الذروة بمرونة تامة لدعم القرارات الفورية.",
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
    }
  ];

  const missionStats = [
    {
      value: "99.9%",
      label: "استقرار وموثوقية النظام",
      subtext: "جاهزية مستمرة دون انقطاع",
      color: "emerald",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      value: "+50,000",
      label: "تذكرة مصدرة بنجاح",
      subtext: "في مختلف المعارض والمؤتمرات",
      color: "cyan",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      value: "< 0.5s",
      label: "متوسط سرعة مسح التذكرة",
      subtext: "استجابة فورية بدون تأخير",
      color: "blue",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }
  ];

  const visionPillars = [
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      title: "رقمنة شاملة وبدون ورق",
      desc: "التخلص التام من الطوابير والقوائم الورقية المرهقة، والانتقال إلى تذاكر رقمية ذكية وشارات تفاعلية."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      title: "أمان وموثوقية عالية",
      desc: "تشفير التذاكر ورموز QR لمنع التزوير وتكرار الدخول وضمان تجربة آمنة للمنظم والزائر."
    },
    {
      icon: <Globe2 className="w-5 h-5 text-purple-400" />,
      title: "معايير عالمية وهوية محلية",
      desc: "دعم أصيل وكامل للغتين العربية والإنجليزية، متوافق مع متطلبات السوق في الجزائر والشرق الأوسط."
    }
  ];

  return (
    <section className="bg-slate-950 py-24 sm:py-32 overflow-hidden relative" id="about">
      
      {/* خلفية جمالية مستوحاة من مدارات الفضاء (Cosmic Orbit Background Gradients) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        {/* هالات مضيئة ناعمة */}
        <div className="absolute top-24 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[45%] -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        
        {/* حلقات مدارية أنيقة في الخلفية */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full border border-cyan-500/5 opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-237.5 h-237.5 rounded-full border border-blue-500/5 opacity-30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28 sm:space-y-36">

        {/* 1. قسم "قصتنا" (Our Story) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* العمود الأيمن: النص الرئيسي والمقدمة */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-9 py-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
              <span> OUR STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
              نبني البنية التحتية <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400">
                لقطاع الفعاليات في المنطقة
              </span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
              انطلقت <strong className="text-white font-semibold">ORBIT</strong> لحل المشكلات المعقدة التي يواجهها منظمو المعارض والمؤتمرات، وتقديم تجربة سلسة وعصرية تجمع المنظمين، العارضين، والزوار في نظام بيئي رقمي موحد.
            </p>

            {/* بطاقة الشعار والبيان المقتبس */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <OrbitLogo className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">مساحة رقمية متكاملة</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                    المنصة التي تضمن كفاءة التشغيل، سرعة الدخول، ودقة الإحصائيات في كل حدث.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الأيسر: الخط الزمني التفاعلي للخطوات */}
          <div className="w-full lg:w-7/12 space-y-6">
            {storySteps.map((step, idx) => (
              <div 
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                {/* شريط الإضاءة العلوي عند التحويم */}
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-cyan-500/0 group-hover:via-cyan-500/50 to-transparent transition-all duration-500" />

                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* رقم الخطوة وأيقونتها */}
                  <div className="flex items-center sm:flex-col justify-between sm:justify-start gap-3 shrink-0 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all">
                      {step.icon}
                    </div>
                    <span className="text-2xl sm:text-xl font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* المحتوى */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 2. قسم "مهمتنا" (Our Mission) */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
          
          {/* العمود النصي والإحصائيات */}
          <div className="w-full lg:w-1/2 text-start">
            <div className="inline-flex items-center gap-2 px-9 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
              <span> OUR MISSION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] tracking-tight mb-6">
              تمكين المنظمين بأحدث <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400">
                تقنيات إدارة المعارض والمؤتمرات
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10">
              نسعى لتمكين الشركات، الهيئات الحكومية، والجامعات في الجزائر والشرق الأوسط من تنظيم وإدارة فعالياتهم باحترافية عالمية، عبر توفير حلول ذكية ومتطورة تدعم اللغتين العربية والإنجليزية بشكل كامل.
            </p>
            
            {/* بطاقات الإحصائيات (Metrics Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {missionStats.map((stat, i) => (
                <div 
                  key={i}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 font-mono">
                    <span className={`text-transparent bg-clip-text ${
                      stat.color === 'emerald' ? 'bg-linear-to-r from-emerald-400 to-teal-300' :
                      stat.color === 'cyan' ? 'bg-linear-to-r from-cyan-400 to-blue-300' :
                      'bg-linear-to-r from-blue-400 to-indigo-300'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                  <h4 className="text-white text-xs font-bold mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-tight">
                    {stat.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* العمود البصري (الصورة مع إطارات وبطاقات عائمة) */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* هالة خلفية ناعمة */}
              <div className="absolute -inset-2 bg-linear-to-r from-emerald-500/20 to-cyan-500/20 rounded-[2.5rem] blur-xl opacity-60" />

              {/* حاوية الصورة الأساسية */}
              <div className="relative aspect-4/3 sm:aspect-16/11 rounded-4xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                  alt="فريق عمل أوربت" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* تدرج تظليل احترافي فوق الصورة */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* بطاقة عائمة داخلية: مؤشر الحالة الحية */}
                <div className="absolute bottom-5 right-5 left-5 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <div className="text-white text-xs font-bold">جاهزية تشغيلية كاملة</div>
                      <div className="text-slate-400 text-[11px]">دعم فني وتغطية ميدانية للفعاليات</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Live Active
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. قسم "رؤيتنا" (Our Vision) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* العمود النصي وركائز الرؤية */}
          <div className="w-full lg:w-1/2 text-start">
            <div className="inline-flex items-center gap-2 px-9 py-3 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
              <span>OUR VISION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] tracking-tight mb-6">
              مستقبل الفعاليات الذكية <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-teal-300">
                يبدأ من هنا
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              نؤمن بأن عالم الفعاليات يتسارع نحو الرقمنة الفائقة؛ فالأمر لم يعد مجرد طباعة بطاقات أو تذاكر ورقية، بل توفير تجربة ذكية تفاعلية مدعومة بالبيانات اللحظية والأمان الشامل.
            </p>

            {/* ركائز الرؤية المستقبلية */}
            <div className="space-y-4">
              {visionPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-white/15 hover:bg-slate-900/70 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-base font-bold mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* العمود البصري (الصورة مع تأثيرات العرض المستقبلي) */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* هالة خلفية ناعمة */}
              <div className="absolute -inset-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-60" />

              <div className="relative aspect-4/3 sm:aspect-16/11 rounded-4xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                  alt="الرؤية المستقبلية لـ Orbit" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* تدرج لوني خفيف */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* بطاقة عائمة للمنصة */}
                <div className="absolute top-5 right-5 px-3.5 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <OrbitLogo className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">ORBIT Next-Gen</span>
                </div>

                <div className="absolute bottom-5 right-5 left-5 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white text-xs font-bold">المعيار الإقليمي لإدارة الفعاليات</div>
                    <div className="text-slate-400 text-[11px]">مصممة للمؤسسات، الشركات والجامعات</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                    <span>موثوق 100%</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4. شريط الدعوة للتفاعل (Bottom CTA Banner) */}
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-cyan-500/20 p-8 sm:p-12 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          {/* تأثير توهج داخلي */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />

          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              جاهز لإطلاق فعاليتك القادمة بأعلى معايير الكفاءة؟
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              انضم إلى المنظمين الذين يعتمدون على <span className="text-cyan-400 font-semibold">ORBIT</span> لتسهيل إدارة الحضور، التذاكر، والإحصائيات الفورية.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#pricing"
                className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2"
              >
                <span>استكشف الباقات والأسعار</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center"
              >
                تواصل مع فريقنا
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}