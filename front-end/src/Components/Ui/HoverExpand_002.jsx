"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const HoverExpand_002 = ({ images, className }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        "relative w-full max-w-4xl mx-auto h-155 sm:h-170",
        className
      )}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-center gap-3">
        {images.map((image, index) => {
          const isActive = activeImage === index;

          return (
            <motion.div
              key={index}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={image.title}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 flex-1 min-h-18 sm:min-h-20 select-none transition-colors",
                isActive ? "border-cyan-500/40 ring-1 ring-cyan-500/20" : "hover:border-white/20"
              )}
              layout
              animate={{
                flex: isActive ? 6 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveImage(index);
                }
              }}
            >
              {/* Background Image */}
              <img
                src={image.src}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                alt={image.title}
              />

              {/* Active State Details */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-slate-900/30 z-10"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className="absolute inset-0 z-20 flex flex-col justify-end p-5 sm:p-8 text-start"
                    >
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="text-cyan-400 font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                          {image.code}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                        {image.description}
                      </p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Inactive State Bar (Horizontal header across all devices) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 z-20 flex items-center justify-between px-5 sm:px-8 bg-slate-950/75 backdrop-blur-[2px] transition-colors group-hover:bg-slate-950/60"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-slate-400 text-xs sm:text-sm font-mono font-semibold">
                        {image.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white/90 group-hover:text-white transition-colors">
                        {image.title}
                      </h3>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-emerald-500 flex items-center justify-center text-emerald-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export { HoverExpand_002 };
