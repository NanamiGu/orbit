"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const StackedCards = ({ items = [], className }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const total = items.length;

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (pauses when hovered)
  useEffect(() => {
    if (!autoPlay || isHovered || total <= 1) return;
    const interval = setInterval(() => {
      nextCard();
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay, isHovered, nextCard, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        isRtl ? prevCard() : nextCard();
      } else if (e.key === "ArrowLeft") {
        isRtl ? nextCard() : prevCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRtl, nextCard, prevCard]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className={cn("relative w-full max-w-5xl mx-auto flex flex-col items-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Navigation Pills */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12 z-30">
        {items.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer border",
                isSelected
                  ? "text-white border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "text-slate-400 border-white/5 bg-slate-900/60 hover:text-slate-200 hover:border-white/15 hover:bg-slate-900/90"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activePillGlow"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 border border-cyan-400/40"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="font-mono text-cyan-400 relative z-10 text-[11px] sm:text-xs">
                {item.code || `0${idx + 1}`}
              </span>
              <span className="relative z-10">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Stack Deck Container */}
      <div className="relative w-full h-[480px] sm:h-[420px] md:h-[390px] px-2 sm:px-4">
        {items.map((item, index) => {
          // Calculate relative stack offset
          const diff = (index - activeIndex + total) % total;
          const isTop = diff === 0;

          // Compute visual stack transformations
          const scale = 1 - diff * 0.045;
          const translateY = diff * 18;
          const zIndex = total - diff;
          const opacity = diff > 3 ? 0 : 1 - diff * 0.18;
          const brightness = 1 - diff * 0.15;

          return (
            <motion.div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={item.title}
              onClick={() => {
                if (!isTop) setActiveIndex(index);
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(e, { offset, velocity }) => {
                if (Math.abs(offset.x) > 80 || Math.abs(velocity.x) > 350) {
                  if (offset.x < 0) {
                    isRtl ? prevCard() : nextCard();
                  } else {
                    isRtl ? nextCard() : prevCard();
                  }
                }
              }}
              animate={{
                top: `${translateY}px`,
                scale,
                zIndex,
                opacity,
                filter: `brightness(${brightness})`,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className={cn(
                "absolute inset-x-2 sm:inset-x-6 md:inset-x-10 rounded-3xl overflow-hidden cursor-pointer select-none",
                "bg-slate-900/90 backdrop-blur-xl border transition-shadow duration-300",
                isTop 
                  ? "border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/20" 
                  : "border-white/10 hover:border-white/20 shadow-xl"
              )}
              style={{
                height: "calc(100% - 60px)",
              }}
            >
              {/* Internal Card Grid */}
              <div className="h-full w-full grid grid-cols-1 md:grid-cols-12 relative overflow-hidden">
                
                {/* Content Section (7 Cols on Desktop) */}
                <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-start relative z-20">
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        {item.code || `#0${index + 1}`}
                      </span>

                      {item.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-white/10 text-slate-300">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature Footer Item */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.footerText || "دخول رقمي سريع وبدون طوابير"}</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <span>{index + 1}</span>
                      <span className="text-slate-600">/</span>
                      <span>{total}</span>
                    </div>
                  </div>
                </div>

                {/* Visual Image Section (5 Cols on Desktop) */}
                <div className="md:col-span-5 relative h-48 md:h-full overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60" />

                  {/* Ambient Glow Pill */}
                  <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:end-4 z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-slate-200">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{item.tag || "ORBIT FastPass"}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Stack Peek Tint when not Top */}
              {!isTop && (
                <div className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/20 transition-colors z-30" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="w-full flex items-center justify-between sm:justify-center gap-6 mt-8 z-30 px-6">
        {/* Previous Button */}
        <button
          type="button"
          onClick={isRtl ? nextCard : prevCard}
          aria-label="Previous card"
          className="w-11 h-11 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* Indicator Dots / Numbers */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === idx
                  ? "w-7 bg-gradient-to-r from-cyan-400 to-emerald-400"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
              )}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={isRtl ? prevCard : nextCard}
          aria-label="Next card"
          className="w-11 h-11 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Swipe/Click Hint */}
      <div className="mt-4 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
        <Layers className="w-3.5 h-3.5 text-cyan-400/70" />
        <span>{isRtl ? "انقر على البطاقة أو اسحب للتنقل" : "Click on any card or swipe to navigate"}</span>
      </div>
    </div>
  );
};

export { StackedCards };
