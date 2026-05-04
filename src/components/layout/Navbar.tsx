"use client"
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  lang: 'fr' | 'en';
  setLang: (l: 'fr' | 'en') => void;
  t: any;
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  if (!t || !t.nav) return null;

  const navLinks = [
    { id: "home",     label: t.nav.home,     href: "/" },
    { id: "about",    label: t.nav.about,    href: "/about" },
    { id: "services", label: t.nav.services, href: "/#services" },
    { id: "contact",  label: t.nav.contact,  href: "/#contact" },
  ];

  // Gestion robuste de l'état actif basé sur l'URL réelle
  useEffect(() => {
    const syncActiveState = () => {
      const hash = window.location.hash;
      
      if (pathname === "/about") {
        setActiveTab("about");
      } else if (hash === "#services") {
        setActiveTab("services");
      } else if (hash === "#contact") {
        setActiveTab("contact");
      } else if (pathname === "/") {
        setActiveTab("home");
      }
    };

    // Exécuter au montage et à chaque changement de route
    syncActiveState();

    // Écouter les changements de hash (scroll ou clic ancre)
    window.addEventListener("hashchange", syncActiveState);
    return () => window.removeEventListener("hashchange", syncActiveState);
  }, [pathname]);

  return (
    <>
      {/* ── DESKTOP NAV ─────────────────────────────── */}
      <nav className="fixed top-8 left-0 right-0 z-[60] hidden md:flex justify-center px-4">
        <div className="relative flex items-center bg-white/95 backdrop-blur-md border border-gray-200 p-1.5 rounded-2xl shadow-xl">

          <div className="px-6 py-2.5 flex items-center justify-center mr-2">
            <span className="text-black font-black tracking-tighter text-sm">VYSE</span>
          </div>

          <div className="flex items-center gap-1 pr-4 relative">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-5 py-2 text-[11px] font-black uppercase tracking-tight transition-colors duration-200 z-20 ${
                    isActive ? "text-[#CCFF00]" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-black rounded-lg"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}

            <div className="h-4 w-[1px] bg-gray-200 mx-2" />

            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-[10px] font-black text-gray-900 border border-gray-100 hover:bg-[#CCFF00] transition-all"
            >
              <Globe size={12} /> {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAV ───────────────────────────── */}
      <nav className="fixed top-6 left-0 right-0 z-[60] flex md:hidden items-center justify-end px-6 pointer-events-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 pointer-events-auto"
        >
          {isOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[55] bg-white flex flex-col justify-center px-10 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-5xl font-black uppercase tracking-tighter ${
                    activeTab === link.id ? "text-black" : "text-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}