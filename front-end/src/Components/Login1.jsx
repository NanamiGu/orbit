import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "./Ui/button";
import Input from "./Ui/input";
import OrbitLogo from "./OrbitLogo";
import LanguageSelector from "./LanguageSelector";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login1({ className }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.general) {
      setErrors((prev) => ({ ...prev, [field]: "", general: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = t("auth.emailRequired");
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = t("auth.invalidEmail");
    }

    if (!formData.password) {
      newErrors.password = t("auth.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("auth.invalidPassword");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      triggerShake();
      return;
    }

    console.log("Login submitted:", formData);
  };

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

          <div
            className={cn(
              "flex w-full flex-col items-center gap-y-5 rounded-2xl border bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300",
              isShaking ? "animate-shake border-red-500/50 shadow-red-500/10" : "border-white/10 shadow-black/40"
            )}
          >
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-white">{t("auth.loginTitle")}</h1>
              <p className="text-sm text-slate-400">{t("auth.loginSubtitle")}</p>
            </div>

            {/* General Error Banner */}
            {errors.general && (
              <div className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}
            
            <form className="w-full space-y-4" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="space-y-1.5 text-start">
                <label className="text-xs font-medium text-slate-300">{t("auth.emailLabel")}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className={cn(
                    "text-sm bg-slate-950/60 transition-all",
                    errors.email
                      ? "border-red-500/80 bg-red-500/5 text-red-100 placeholder:text-red-300/40 focus-visible:ring-red-500/40"
                      : "border-slate-800 focus-visible:ring-emerald-400"
                  )}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5 text-start">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">{t("auth.passwordLabel")}</label>
                  <a
                    href="#forgot-password"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                  >
                    {t("auth.forgotPassword")}
                  </a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    className={cn(
                      "text-sm bg-slate-950/60 pe-10 transition-all",
                      errors.password
                        ? "border-red-500/80 bg-red-500/5 text-red-100 placeholder:text-red-300/40 focus-visible:ring-red-500/40"
                        : "border-slate-800 focus-visible:ring-emerald-400"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400 hover:text-slate-200" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950/60 text-emerald-500 focus:ring-emerald-500/20 focus:ring-2 cursor-pointer accent-emerald-500"
                />
                <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer select-none">
                  {t("auth.rememberMe")}
                </label>
              </div>

              <Button type="submit" className="w-full font-bold py-2.5 bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-[0.99]">
                {t("auth.loginButton")}
              </Button>
            </form>
          </div>

          <div className="flex justify-center items-center gap-1.5 text-sm text-slate-400">
            <p>{t("auth.dontHaveAccount")}</p>
            <Link
              to="/signup"
              className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
            >
              {t("auth.signupLink")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
