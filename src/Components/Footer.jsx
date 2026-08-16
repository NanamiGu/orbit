import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OrbitLogo from './OrbitLogo';

export default function Footer({ onOpenActionModal }) {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <div className="flex items-center gap-3">
              <OrbitLogo className="w-8 h-8" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white tracking-wider uppercase font-sans">ORBIT</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
            
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                {t("footer.algeriaPill")}
              </span>
            </div>
          </div>

          {/* Links Column 1 — المنتج */}
          <div className="text-start">
            <h4 className="text-white font-bold text-sm mb-4">{t("footer.colProduct")}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  {t("footer.linkFeatures")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  {t("footer.linkPricing")}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  {t("footer.linkHowItWorks")}
                </a>
              </li>
              <li>
                <a 
                  href="#faq"
                  onClick={(e) => {
                    if (onOpenActionModal) {
                      e.preventDefault();
                      onOpenActionModal(t("footer.linkFaq"));
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t("footer.linkFaq")}
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 — الشركة */}
          <div className="text-start">
            <h4 className="text-white font-bold text-sm mb-4">{t("footer.colCompany")}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#who-its-for"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t("footer.linkAbout")}
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    if (onOpenActionModal) {
                      e.preventDefault();
                      onOpenActionModal(t("footer.linkContact"));
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t("footer.linkContact")}
                </a>
              </li>
              <li>
                <a 
                  href="#privacy"
                  onClick={(e) => {
                    if (onOpenActionModal) {
                      e.preventDefault();
                      onOpenActionModal(t("footer.linkPrivacy"));
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t("footer.linkPrivacy")}
                </a>
              </li>
              <li>
                <a 
                  href="#terms"
                  onClick={(e) => {
                    if (onOpenActionModal) {
                      e.preventDefault();
                      onOpenActionModal(t("footer.linkTerms"));
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t("footer.linkTerms")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Contact Column */}
          <div className="text-start">
            <h4 className="text-white font-bold text-sm mb-4">{t("footer.colContact")}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/213550000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span dir="ltr">{t("footer.whatsapp")}</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@orbit.dz" 
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                  <span dir="ltr">{t("footer.email")}</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <svg className="w-4 h-4 text-cyan-400 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
                  </svg>
                  <span>{t("footer.linkedin")}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t("footer.copyright")}</p>
          <p className="flex items-center gap-1">
            {t("footer.madeWith")}
          </p>
        </div>

      </div>
    </footer>
  );
}
