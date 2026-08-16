import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import OrbitLogo from "./OrbitLogo";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <OrbitLogo className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold tracking-widest text-white uppercase font-sans">
              Orbit
            </span>
          </div>

          {/* Desktop Nav Links */}
          {/* استخدام 'gap-8' بدلاً من 'space-x' لضمان التوافق التلقائي مع الـ RTL */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              المميزات
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              الأسعار
            </a>
            <a href="#contact" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              تواصل معنا
            </a>
            
            {/* فاصل رأسي (Divider) */}
            <div className="w-px h-5 bg-white/20"></div>

            {/* Language Toggle & CTA */}
            <button className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              تسجيل الدخول
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 flex flex-col gap-4">
            <a href="#features" onClick={() => setMobileMenuIsOpen(false)} className="text-slate-300 hover:text-white text-base font-medium">
              المميزات
            </a>
            <a href="#pricing" onClick={() => setMobileMenuIsOpen(false)} className="text-slate-300 hover:text-white text-base font-medium">
              الأسعار
            </a>
            <hr className="border-white/10 my-2" />
            <button className="text-start text-slate-300 hover:text-white text-base font-medium flex items-center gap-2">
              <Globe className="w-5 h-5" /> العربية / English
            </button>
            <button className="bg-cyan-500 text-slate-950 px-5 py-3 rounded-lg text-base font-bold w-full mt-2">
              تسجيل الدخول
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}