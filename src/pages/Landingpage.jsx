import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import HowItWorks from "../Components/HowItWorks";
import WhoItsFor from "../Components/WhoItsFor";
import PricingSection from "../Components/PricingSection";
import FinalCTA from "../Components/FinalCTA";
import Footer from "../Components/Footer";

export default function Landingpage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 1. NAVBAR */}
      <Navbar scrolled={scrolled} />

      <main>
        {/* 2. HERO */}
        <Hero />

        {/* 3. FEATURES */}
        <Features />

        {/* 4. HOW IT WORKS */}
        <HowItWorks />

        {/* 5. WHO IT'S FOR */}
        <WhoItsFor />

        {/* 6. PRICING */}
        <PricingSection />

        {/* 7. FINAL CTA */}
        <FinalCTA />
      </main>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
}
