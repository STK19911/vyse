"use client"
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface HeroProps {
  t: any;
}

const images = ["/hero.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function Hero({ t }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsExpanded(false);
    }
  }, []);

  useEffect(() => {
    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, handleKeyDown]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!t || !t.hero) return null;
  const currentContent = t.hero[index];

  return (
    <>
      {mounted && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              key="close-hero-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(false)}
              style={{
                position: "fixed",
                top: typeof window !== 'undefined' && window.innerWidth < 640 ? "6rem" : "2rem", 
                right: typeof window !== 'undefined' && window.innerWidth < 640 ? "1.5rem" : "2rem",
                zIndex: 99999,
                cursor: "pointer",
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <X size={20} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>,
        document.body
      )}

      <section
        className={`relative transition-all duration-700 ease-in-out ${
          isExpanded
            ? "h-screen p-0"
            // Modification ici : augmentation du padding horizontal (px-8)
            : "h-[85vh] sm:h-[90vh] md:h-[92vh] py-2 px-8 pt-20 sm:pt-24"
        }`}
      >
        <motion.div
          layout
          className={`relative h-full w-full overflow-hidden bg-black shadow-2xl transition-all duration-500 ${
            isExpanded ? "rounded-none" : "rounded-2xl sm:rounded-[3rem]"
          }`}
        >
          <div className={`absolute inset-0 z-30 flex ${isExpanded ? "pointer-events-none" : ""}`}>
            <div
              onClick={prevSlide}
              className="h-full w-1/2 cursor-pointer pointer-events-auto"
            />
            <div
              onClick={(e) => {
                if (!isExpanded) {
                  setIsExpanded(true);
                } else {
                  nextSlide(e);
                }
              }}
              className="h-full w-1/2 cursor-pointer pointer-events-auto"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url('${images[index]}')` }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-700 ${
                  isExpanded ? "bg-black/25" : "bg-black/45"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          <div
            className={`relative z-40 flex h-full flex-col justify-end sm:justify-center pointer-events-none transition-all duration-700 ${
              isExpanded
                ? "px-6 sm:px-12 md:px-32 pb-14 sm:pb-0"
                : "px-5 sm:px-10 md:px-20 pb-14 sm:pb-0"
            }`}
          >
            <motion.div
              key={`content-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="h-[2px] w-6 sm:w-8 bg-[#CCFF00]" />
                <span className="text-[#CCFF00] font-bold tracking-widest uppercase text-[9px] sm:text-[10px]">
                  {currentContent.tag}
                </span>
              </div>

              <h1
                className={`max-w-5xl font-black text-white leading-[0.85] tracking-tighter uppercase transition-all duration-500 ${
                  isExpanded
                    ? "text-[clamp(1.8rem,5vw,4.5rem)]"
                    : "text-[clamp(1.8rem,5vw,3.75rem)]"
                }`}
              >
                {currentContent.title}
                <br />
                <span className="text-white/80">{currentContent.subtitle}</span>
              </h1>

              <button className="group mt-7 sm:mt-10 w-fit flex items-center gap-3 sm:gap-4 bg-[#CCFF00] pl-5 sm:pl-7 pr-2 py-2 rounded-full font-black text-[11px] sm:text-[12px] text-black hover:bg-white transition-all uppercase shadow-lg pointer-events-auto">
                {currentContent.cta}
                <div className="bg-black text-white p-2.5 sm:p-3 rounded-full group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            </motion.div>
          </div>

          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 flex gap-2 z-50 pointer-events-none">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === index ? "w-6 sm:w-8 bg-[#CCFF00]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}