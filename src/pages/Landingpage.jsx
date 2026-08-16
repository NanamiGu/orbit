import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import HowItWorks from "../Components/HowItWorks";
import WhoItsFor from "../Components/WhoItsFor";
import PricingSection from "../Components/PricingSection";
import FinalCTA from "../Components/FinalCTA";
import Footer from "../Components/Footer";
import ActionModal from "../Components/ActionModal";

export default function Landingpage() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState("ابدأ مجاناً");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenActionModal = (intent = "ابدأ مجاناً") => {
    setModalIntent(intent);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 1. NAVBAR */}
      <Navbar 
        scrolled={scrolled} 
        onOpenActionModal={handleOpenActionModal} 
      />

      <main>
        {/* 2. HERO */}
        <Hero 
          onOpenActionModal={handleOpenActionModal} 
        />

        {/* 3. SOCIAL PROOF BAR */}

        {/* 4. FEATURES */}
        <Features />

        {/* 5. HOW IT WORKS */}
        <HowItWorks />

        {/* 6. WHO IT'S FOR */}
        <WhoItsFor />

        {/* 7. PRICING */}
        <PricingSection 
          onOpenActionModal={handleOpenActionModal} 
        />

        {/* 8. FINAL CTA */}
        <FinalCTA 
          onOpenActionModal={handleOpenActionModal} 
        />
      </main>

      {/* 9. FOOTER */}
      <Footer 
        onOpenActionModal={handleOpenActionModal} 
      />

      {/* Action / Trial Signup Modal */}
      <ActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIntent={modalIntent}
      />
    </div>
  );
}
