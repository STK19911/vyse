"use client"
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TrustProps {
  t: any;
}

const gallery = [
  { 
    img: "/Ultra-realistic studio portrait of the same woman as the reference image, waist-up composition.jpg", 
    y: "0", 
    baseH: "220px",
    hoverH: "280px",
    delay: 0.1 
  },
  { 
    img: "/SCAN.jpg", 
    y: "-20px", 
    baseH: "190px",
    hoverH: "250px",
    delay: 0.2 
  },
  { 
    img: "/Generated Image May 03, 2026 - 11_26PM.jpg", 
    y: "20px", 
    baseH: "240px",
    hoverH: "300px",
    delay: 0.3 
  },
  { 
    img: "/uber.jpg", 
    y: "-10px", 
    baseH: "210px",
    hoverH: "270px",
    delay: 0.4 
  },
];

export default function Trust({ t }: TrustProps) {
  return (
    <section className="py-12 md:py-20 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* GALERIE - Animation de hauteur ultra-fluide */}
        <div className="flex justify-center items-center gap-3 md:gap-6 mb-12 h-[350px]">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, height: item.baseH }}
              whileInView={{ opacity: 1, y: item.y }}
              whileHover={{ 
                height: item.hoverH,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
              }}
              transition={{ 
                duration: 0.8, 
                delay: item.delay, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true }}
              className="w-24 sm:w-44 rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white group cursor-pointer relative"
            >
              <img 
                src={item.img} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                alt="Vyse Context" 
              />
            </motion.div>
          ))}
        </div>

        {/* TEXTE - Compact et Gradient Lime */}
        <div className="text-center max-w-3xl mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[9px] font-black uppercase tracking-[0.2em] mb-6 text-gray-400"
          >
            Infrastructure & Confiance
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] tracking-tighter uppercase mb-6">
            L'excellence <span className="bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] bg-clip-text text-transparent">digitale</span> <br /> au service de l'Afrique.
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed px-4 max-w-xl mx-auto">
            Vyse est le moteur financier qui propulse les leaders de demain en transformant la complexité des paiements en une force invisible.
          </p>

          <button className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all duration-300 shadow-xl">
            Rejoindre l'écosystème
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}