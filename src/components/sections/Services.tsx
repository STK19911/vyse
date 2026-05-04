"use client"
import { motion } from "framer-motion";
import { Wallet, QrCode, Repeat, BarChart3, ArrowUpRight } from "lucide-react";

export default function Services({ t }: { t: any }) {
  if (!t || !t.services) return null;

  const icons = [
    <Wallet size={24} />, 
    <QrCode size={24} />, 
    <Repeat size={24} />, 
    <BarChart3 size={24} />
  ];

  // Couleurs basées sur ton image de référence
  const cardColors = ["bg-[#0F0F0F]", "bg-[#202020]", "bg-[#5DD62C]", "bg-[#337418]"];
  const textColors = ["text-[#CCFF00]", "text-white", "text-black", "text-white"];

  return (
    <section id="services" className="py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20 space-y-4">
          <span className="text-black font-black uppercase tracking-[0.3em] text-[10px] border border-black/10 px-3 py-1 rounded-full">
            {t.services.tag}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-black leading-[0.85] uppercase tracking-tighter">
            {t.services.title} <br />
            <span className="text-gray-300">{t.services.subtitle}</span>
          </h2>
        </div>

        {/* CONTAINER DES CARTES EMPILÉES HORIZONTALEMENT */}
        <div className="flex flex-col md:flex-row items-center justify-center md:-space-x-12 space-y-4 md:space-y-0">
          {t.services.items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 50,
                rotate: i % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              className={`relative w-full md:w-[320px] h-[420px] ${cardColors[i]} p-10 rounded-[3.5rem] shadow-2xl cursor-pointer border border-white/5 flex flex-col justify-between group`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center ${textColors[i]}`}>
                  {icons[i]}
                </div>
                <ArrowUpRight className={`${textColors[i]} opacity-20 group-hover:opacity-100 transition-opacity`} size={24} />
              </div>

              <div className="space-y-4">
                <h3 className={`text-3xl font-black uppercase tracking-tighter leading-none ${textColors[i]}`}>
                  {item.title}
                </h3>
                <p className={`text-sm font-medium leading-relaxed ${i === 2 ? "text-black/60" : "text-white/40"}`}>
                  {item.desc}
                </p>
              </div>

              {/* Numéro de la carte pour le style */}
              <span className={`absolute top-10 right-10 text-4xl font-black opacity-5 ${textColors[i]}`}>
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}