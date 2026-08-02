"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const letter = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  const headline = "Transform Your Mood Into Beautiful Design";

  function scrollToStudio() {
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="relative z-10 text-center max-w-3xl">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          {headline.split(" ").map((word, i) => (
            <motion.span key={i} variants={letter} className="inline-block mr-3">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-lg text-white/60"
        >
          Describe your emotions. Watch AI create your perfect design system.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.5)" }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToStudio}
          className="mt-10 px-8 py-3 rounded-full font-medium bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-900/40"
        >
          Generate My Palette
        </motion.button>
      </div>

      <motion.button
        onClick={scrollToStudio}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-10 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}