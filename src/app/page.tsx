"use client"
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Trust from "@/components/sections/Trust";
import AppPreview from "@/components/sections/AppPreview";
import Contact from "@/components/sections/Contact";
import { translations } from "@/constants/translations";

export default function Home() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [mounted, setMounted] = useState(false);
  
  const t = translations[lang];

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'auto';
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-white min-h-screen">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      
      <div className="relative z-10 bg-white">
        <div className="-mt-12 relative z-20">
          <Partners />
        </div>
        <Services t={t} />
        <Trust t={t} />
        <AppPreview />
        <Contact t={t} />
      </div>

      <footer className="py-12 text-center text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] bg-black">
        © 2026 VYSE — DIGITAL INFRASTRUCTURE FOR WEST AFRICA
      </footer>
    </main>
  );
}