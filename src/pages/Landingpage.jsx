import Navbar from '../Components/Navbar';
import { useEffect, useState } from "react";
import Hero from '../Components/Hero';
import PricingSection from '../Components/PricingSection';
import WhyChooseUs from '../Components/WhyChooseUs';
import AboutOrbit from '../Components/AboutOrbit';

function Landingpage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <WhyChooseUs />
      <PricingSection />
      <AboutOrbit />

    </div>
  );
}

export default Landingpage;
