import React, { useState } from "react";
import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import OrbitLogo from "./OrbitLogo";
import LanguageSelector from "./LanguageSelector";

export default function Navbar({ scrolled }) {
  const { t, i18n } = useTranslation();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const isRtl = i18n.language === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const navLinks = [
    { label: t("nav.product"), href: "#features" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.whoItsFor"), href: "#who-its-for" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
          >
            <OrbitLogo className="w-9 h-9 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-wider text-white uppercase font-sans">
                ORBIT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors hover:-translate-y-px duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Selector Dropdown */}
            <LanguageSelector variant="desktop" />

            <div className="w-px h-5 bg-white/10" />

            <a
              href="#pricing"
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-950 bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 active:scale-[0.98]"
            >
              <span>{t("nav.cta")}</span>
              <ArrowIcon className={`w-4 h-4 transition-transform ${isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              onClick={() => setMobileMenuIsOpen((prev) => !prev)}
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuIsOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuIsOpen(false)}
                className="px-4 py-3 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 text-base font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <LanguageSelector variant="mobile" />

              <a
                href="#pricing"
                onClick={() => setMobileMenuIsOpen(false)}
                className="w-full py-3.5 px-5 rounded-xl bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>{t("nav.cta")}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}