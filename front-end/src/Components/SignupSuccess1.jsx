import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "./Ui/button";
import OrbitLogo from "./OrbitLogo";
import LanguageSelector from "./LanguageSelector";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowLeft, ArrowRight, LogIn } from "lucide-react";

export default function SignupSuccess1({ className }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const isRegistered = Boolean(location.state?.registered);
  const userName = location.state?.name;

  useEffect(() => {
    // Gracefully redirect direct URL visits without registration context
    if (!isRegistered) {
      navigate("/signup", { replace: true });
    }
  }, [isRegistered, navigate]);

  if (!isRegistered) {
    return null;
  }

  return (
    <section className={cn("min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 relative overflow-hidden", className)}>
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="absolute top-6 inset-x-6 flex items-center justify-between z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowIcon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>{t("auth.backToHome")}</span>
        </Link>
        <LanguageSelector variant="desktop" />
      </div>

      <div className="flex h-full w-full items-center justify-center relative z-10 pt-16 sm:pt-0">
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <OrbitLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-2xl font-bold tracking-wider text-white uppercase font-sans">
              ORBIT
            </span>
          </Link>

          <div className="flex w-full flex-col items-center gap-y-6 rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 text-center">
            {/* Animated Success Icon */}
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/20">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-25" />
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {t("auth.successTitle")}
              </h1>
              {userName && (
                <p className="text-sm font-medium text-emerald-400">
                  {userName}
                </p>
              )}
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                {t("auth.successSubtitle")}
              </p>
            </div>

            {/* Actions */}
            <div className="w-full space-y-3 pt-2">
              {/* Primary Action: Go to Login */}
              <Link to="/login" className="w-full block">
                <Button className="w-full font-bold py-2.5 bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>{t("auth.goToLogin")}</span>
                </Button>
              </Link>

              {/* Secondary Action: Return Home */}
              <Link to="/" className="w-full block">
                <Button
                  variant="outline"
                  className="w-full text-slate-300 hover:text-white border-white/10 hover:border-white/20 bg-slate-950/40 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span>{t("auth.backToLanding")}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
