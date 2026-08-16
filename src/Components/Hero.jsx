import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  // استخدام useEffect لتفعيل حركات الدخول السلسة عند تحميل المكون
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      
      {/* المؤثرات البصرية الخلفية (Abstract Orbit Background) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 rounded-full border border-white/5 shadow-[0_0_100px_rgba(6,182,212,0.05)] animate-[spin_60s_linear_infinite]" /> 
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full border border-white/5 shadow-[0_0_100px_rgba(6,182,212,0.05)] animate-[spin_60s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-cyan-500/10 shadow-[0_0_80px_rgba(6,182,212,0.1)] animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-blue-500/10 shadow-[0_0_60px_rgba(6,182,212,0.15)] animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-full border border-blue-500/10 shadow-[0_0_60px_rgba(6,182,212,0.15)] animate-[spin_20s_linear_infinite]" />
      {/* المحتوى الرئيسي (متمركز في المنتصف) */}
     <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

  {/* العنوان الرئيسي: تحويله للون الأبيض مع تدرج لوني للفت الانتباه لأهم ميزة */}
  <h1 className="text-5xl mb-6 font-extrabold leading-[1.3] text-white tracking-tight">
   Register your participant, confirm their attendance with the code, <br className="hidden sm:block" />
    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
     Follow the numbers in real time
    </span>
  </h1>
  
  {/* الوصف بالفرنسية: لون رمادي فاتح مريح للعين مع تحسين المسافات */}
  <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400 mb-10 font-light">
    Inscription des participants, badges QR, pointage à l’entrée et statistiques en temps réel. <br className="hidden md:block" />
    Toute la logistique de vos événements, sans friction.
  </p>
  
  {/* أزرار الإجراءات (CTAs) */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
    <button className="w-full sm:w-auto px-8 py-4 bg-blue-500/20 hover:bg-cyan-500/50 text-white rounded-lg text-base font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2">
      ابدأ الآن
      <ArrowLeft className="w-5 h-5" /> 
    </button>
    <button className="w-full sm:w-auto px-8 py-4 bg-blue-500/20 hover:bg-cyan-500/50 text-white border border-white/10 rounded-lg text-base font-medium transition-colors flex items-center justify-center">
      تصفح المميزات
    </button>
  </div>
</div>
    </section>
  );
}