"use client"
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { translations } from "@/constants/translations";
import { ArrowUpRight, Zap, Globe, Shield, TrendingUp } from "lucide-react";

// ─── Icons map (stateless, no i18n needed) ──────────────────────────────────
const PILLAR_ICONS = [
  <Zap size={18} />,
  <Globe size={18} />,
  <Shield size={18} />,
  <TrendingUp size={18} />,
];

// ─── Hero Section (isolated so useScroll runs only after mount) ──────────────
function HeroSection({ ta }: { ta: any }) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY  = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale   = useTransform(heroScroll, [0, 1], [1, 1.08]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Parallax image */}
      <motion.div
        style={{ y: heroImageY, scale: heroScale }}
        className="absolute inset-0"
      >
        <img
          src="/VYSE_2.png"
          className="w-full h-full object-cover object-center"
          alt="Vyse"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
      </motion.div>

      {/* Content fades on scroll */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative h-full flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24 max-w-7xl mx-auto"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-[1px] w-8 bg-[#CCFF00]" />
          <span className="text-[#CCFF00] font-black uppercase tracking-[0.5em] text-[9px]">
            {ta.tag}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,8rem)] font-black text-white leading-[0.82] tracking-tighter uppercase"
          >
            {ta.heroLine1}
            <br />
            <span className="text-white/30">{ta.heroLine2}</span>
            <br />
            {ta.heroLine3}
          </motion.h1>
        </div>

        {/* Desc + stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-end gap-8 sm:gap-16"
        >
          <p className="text-white/60 text-sm font-semibold max-w-sm leading-relaxed">
            {ta.heroDesc}
          </p>
          <div className="flex gap-10">
            <div>
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-none tracking-tighter">4</p>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-1">{ta.statOperateurs}</p>
            </div>
            <div>
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black text-[#CCFF00] leading-none tracking-tighter">1</p>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-1">{ta.statApi}</p>
            </div>
            <div>
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-none tracking-tighter">∞</p>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-1">{ta.statPossibilities}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2"
      >
        <div className="h-10 w-[1px] bg-white/20" />
        <span className="text-white/30 text-[8px] font-black uppercase tracking-widest rotate-90 origin-center translate-y-4">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'auto';
  }, []);

  if (!mounted) return null;

  const t  = translations[lang];
  const ta = t.about; // shorthand for about namespace

  return (
    <main className="bg-white min-h-screen">
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <HeroSection ta={ta} />

      {/* ══ MANIFESTE ═════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-40 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">

            {/* Sticky label */}
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-black" />
                <span className="text-black font-black uppercase tracking-[0.5em] text-[8px]">
                  {ta.manifesteTag}
                </span>
              </div>
              <p className="text-[10px] font-black text-black/25 uppercase tracking-widest leading-loose whitespace-pre-line">
                {ta.manifesteLabel}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-12">
              {ta.manifesteParagraphs.map((text: string, i: number) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`leading-[1.4] tracking-tight font-black ${
                    i === 0
                      ? "text-[clamp(1.4rem,2.5vw,2.2rem)] text-black"
                      : "text-[clamp(1rem,1.8vw,1.5rem)] text-black/50"
                  }`}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PILIERS ═══════════════════════════════════════════════════════════ */}
      <section className="bg-black py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#CCFF00]" />
                <span className="text-[#CCFF00] font-black uppercase tracking-[0.5em] text-[8px]">
                  {ta.pilliersTag}
                </span>
              </div>
              <h2 className="text-[clamp(2rem,5vw,5rem)] font-black text-white leading-[0.85] tracking-tighter uppercase">
                {ta.pilliersTitle}<br />
                <span className="text-white/20">{ta.pilliersSubtitle}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
            {ta.pilliers.map((p: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/5 p-8 md:p-10 space-y-8 group hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#CCFF00]">
                    {PILLAR_ICONS[i]}
                  </div>
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{p.label}</span>
                </div>

                <div>
                  <p className="text-[clamp(2rem,3.5vw,3rem)] font-black text-white leading-none tracking-tighter">{p.stat}</p>
                  <p className="text-[9px] font-black text-white/25 uppercase tracking-widest mt-1">{p.statLabel}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">{p.title}</h3>
                  <p className="text-[12px] font-medium text-white/35 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-[1px] w-8 bg-black" />
            <span className="text-black font-black uppercase tracking-[0.5em] text-[8px]">
              {ta.roadmapTag}
            </span>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ originX: 0 }}
              className="hidden md:block absolute top-[22px] left-0 right-0 h-[1px] bg-black/10"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0">
              {ta.timeline.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="md:pr-8 space-y-5"
                >
                  <div className="flex items-center gap-4 md:block">
                    <div className={`w-[10px] h-[10px] rounded-full border-2 md:mb-6 shrink-0 ${
                      i <= 1 ? "border-black bg-black"
                      : i === 2 ? "border-[#CCFF00] bg-[#CCFF00]"
                      : "border-black/20 bg-transparent"
                    }`} />
                    <div className="md:hidden h-[1px] flex-1 bg-black/10" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">{item.year}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter leading-none">{item.event}</h3>
                    <p className="text-[12px] font-semibold text-black/45 leading-relaxed pt-2">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ÉQUIPE ════════════════════════════════════════════════════════════ */}
      <section className="bg-black py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#CCFF00]" />
                <span className="text-[#CCFF00] font-black uppercase tracking-[0.5em] text-[8px]">
                  {ta.teamTag}
                </span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-white leading-[0.85] tracking-tighter uppercase whitespace-pre-line">
                {ta.teamTitle}
              </h2>
              <p className="text-white/30 text-[12px] font-semibold leading-relaxed max-w-xs pt-4">
                {ta.teamDesc}
              </p>
            </div>

            <div className="space-y-0">
              {ta.team.map((member: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between py-8 border-b border-white/5 group cursor-default"
                >
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{member.role}</p>
                    <p className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">{member.focus}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-[#CCFF00] group-hover:text-[#CCFF00] transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════════════════════ */}
      <section className="bg-[#CCFF00] py-24 md:py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black text-black leading-[0.82] tracking-tighter uppercase whitespace-pre-line">
              {ta.ctaTitle}
            </h2>
            <p className="text-black/50 font-semibold text-sm max-w-md">
              {ta.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 bg-black text-white pl-7 pr-2 py-2 rounded-full font-black text-[11px] uppercase shadow-lg"
            >
              {ta.ctaPrimary}
              <div className="bg-[#CCFF00] text-black p-3 rounded-full group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={16} />
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 border-2 border-black/20 text-black px-7 py-3 rounded-full font-black text-[11px] uppercase hover:border-black transition-colors"
            >
              {ta.ctaSecondary}
            </motion.button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="bg-black px-8 md:px-16 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em]">© 2026 Vyse</span>
          <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em]">{ta.footerLocation}</span>
        </div>
      </footer>
    </main>
  );
}