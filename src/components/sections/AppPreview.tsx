"use client"
import { motion } from "framer-motion";

export default function AppPreview() {
  return (
    <section className="py-32 bg-black px-8 rounded-t-[4rem] -mt-10 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Texte explicatif */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-10">
              L'expérience <br /> <span className="text-[#CCFF00]">Mobile</span> sans limites.
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="border-l-2 border-[#CCFF00] pl-6">
                <h4 className="text-white font-bold uppercase text-sm mb-2">Unification Totale</h4>
                <p className="text-gray-400 text-sm">Fini de jongler entre Orange Money, MTN et Wave. Un seul dashboard pour tout voir.</p>
              </div>
              <div className="border-l-2 border-gray-800 pl-6">
                <h4 className="text-white font-bold uppercase text-sm mb-2">Zéro Délai</h4>
                <p className="text-gray-400 text-sm">Transferts instantanés vers n'importe quel numéro, quel que soit l'opérateur.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-white px-8 py-4 rounded-full font-black uppercase text-[10px] hover:bg-[#CCFF00] transition-colors">App Store</button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] hover:bg-white/10 transition-colors">Play Store</button>
            </div>
          </motion.div>
        </div>

        {/* Mockup interactif */}
        <div className="order-1 lg:order-2 flex justify-center">
          <motion.div 
            initial={{ rotate: 5, y: 50, opacity: 0 }}
            whileInView={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-[320px] h-[650px] bg-[#151515] rounded-[3.5rem] border-[10px] border-[#222] shadow-[0_50px_100px_rgba(0,0,0,0.8)] p-6"
          >
            <div className="h-full flex flex-col">
              <div className="w-16 h-1.5 bg-[#222] rounded-full mx-auto mb-10" />
              
              <div className="bg-gradient-to-br from-[#CCFF00] to-[#9eff00] p-6 rounded-[2rem] mb-8">
                <p className="text-black font-bold text-[10px] uppercase mb-1">Balance Vyse</p>
                <h3 className="text-black font-black text-3xl tracking-tighter">840.500 <span className="text-[14px]">FCFA</span></h3>
              </div>

              <div className="space-y-4">
                <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest px-2">Transactions Récentes</p>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div className="flex-1">
                      <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                      <div className="h-1.5 w-12 bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}