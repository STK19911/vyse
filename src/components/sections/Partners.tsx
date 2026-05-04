"use client"
import { motion } from "framer-motion";

const partners = ["Orange", "MTN", "Wave", "Moov", "Airtel", "pawaPay"];

export default function Partners() {
  return (
    <section className="py-8 bg-white border-y border-gray-50 overflow-hidden">
      <div className="flex items-center whitespace-nowrap min-h-[60px]">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-10"
        >
          {[...partners, ...partners].map((p, i) => (
            <span 
              key={i} 
              className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-all cursor-default"
            >
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}