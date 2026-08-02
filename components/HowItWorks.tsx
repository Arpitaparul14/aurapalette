"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MessageSquare, Palette, Download } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Describe your mood", text: "Type a feeling, vibe, or aesthetic — as simple or specific as you like." },
  { icon: Palette, title: "AI generates a theme", text: "Colors, typography, gradients, and effects tailored to that mood, instantly." },
  { icon: Download, title: "Export & use", text: "Copy CSS variables or download the file, ready to drop into any project." },
];

function TiltCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(124,58,237,0.3)" }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 cursor-default"
    >
      <step.icon className="mb-4 text-violet-400" size={28} />
      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
      <p className="text-white/60 text-sm">{step.text}</p>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        How it works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <TiltCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}