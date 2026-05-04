"use client"
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact({ t }: { t: any }) {
  // Sécurité pour éviter les erreurs si les traductions ne sont pas chargées
  if (!t || !t.contact) return null;

  return (
    <section id="contact" className="py-24 bg-black px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* GAUCHE : IDENTITÉ ET ACCROCHE SCALE */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full border border-white/10 text-[#CCFF00] text-[9px] font-black uppercase tracking-[0.3em]"
            >
              {t.contact.tag}
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
              {t.contact.title} <br />
              <span className="text-white/20">{t.contact.subtitle}</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-sm">
              Rejoignez les entreprises qui modernisent leurs flux financiers avec Vyse.
            </p>
          </div>

          {/* DROITE : FORMULAIRE ULTRA-ÉPURÉ */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <form className="space-y-10">
              <div className="space-y-10">
                {/* Champ Nom */}
                <input 
                  type="text" 
                  required 
                  placeholder={t.contact.name}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#CCFF00] transition-colors placeholder:text-gray-700 placeholder:uppercase placeholder:text-[10px] placeholder:font-black" 
                />
                
                {/* Champ Email */}
                <input 
                  type="email" 
                  required 
                  placeholder={t.contact.email}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#CCFF00] transition-colors placeholder:text-gray-700 placeholder:uppercase placeholder:text-[10px] placeholder:font-black" 
                />
                
                {/* Champ Message */}
                <textarea 
                  required 
                  rows={2} 
                  placeholder={t.contact.message}
                  className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#CCFF00] transition-colors placeholder:text-gray-700 placeholder:uppercase placeholder:text-[10px] placeholder:font-black resize-none" 
                />
              </div>

              {/* Bouton d'action */}
              <button className="group flex items-center gap-4 text-[#CCFF00] hover:text-white transition-all">
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                  {t.contact.send}
                </span>
                <div className="w-12 h-12 rounded-full border border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}