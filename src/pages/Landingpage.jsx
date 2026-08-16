import { useTranslation } from 'react-i18next';
import Navbar from '../Components/Navbar';
import { useEffect, useState } from "react";
import Hero from '../Components/Hero';

function Landingpage() {
  const { t, i18n } = useTranslation('Home');
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
    </div>
  );
}

export default Landingpage;
