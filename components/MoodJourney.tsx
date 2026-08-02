"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Parachute({ progress, flip }: { progress: any; flip?: boolean }) {
  const y = useTransform(progress, [0, 1], [-100, 400]);
  const rotate = useTransform(progress, [0, 0.5, 1], [flip ? 8 : -8, 0, flip ? -8 : 8]);
  const x = useTransform(progress, [0, 1], [flip ? 40 : -40, flip ? -40 : 40]);

  return (
    <motion.svg
      style={{ y, rotate, x }}
      width="140"
      height="160"
      viewBox="0 0 140 160"
      className="absolute top-0 left-1/2 -translate-x-1/2 opacity-90 drop-shadow-2xl"
    >
      <path d="M10 40 Q70 -10 130 40 Q100 55 70 55 Q40 55 10 40 Z" fill="white" fillOpacity="0.85" />
      <line x1="20" y1="42" x2="55" y2="90" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="70" y1="55" x2="55" y2="90" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="120" y1="42" x2="85" y2="90" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="70" y1="55" x2="85" y2="90" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
      <rect x="50" y="90" width="20" height="14" rx="3" fill="white" fillOpacity="0.9" />
    </motion.svg>
  );
}

function Scene({
  title,
  text,
  gradient,
  flip,
}: {
  title: string;
  text: string;
  gradient: string;
  flip?: boolean;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: gradient }}
    >
      <Parachute progress={scrollYProgress} flip={flip} />
      <motion.div style={{ opacity, y }} className="relative z-10 text-center px-6 max-w-xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-white/70">{text}</p>
      </motion.div>
    </section>
  );
}

export default function MoodJourney() {
  return (
    <div>
      <Scene
        title="Warm"
        text="Golden light, soft coral, amber glow — the palette of comfort and energy."
        gradient="linear-gradient(160deg, #7c2d12 0%, #ea580c 35%, #fbbf24 70%, #fde68a 100%)"
      />
      <Scene
        title="Cool"
        text="Deep ocean blues, icy teal, quiet violet — the palette of calm and focus."
        gradient="linear-gradient(160deg, #0c1e3e 0%, #1e40af 35%, #0891b2 70%, #a5f3fc 100%)"
        flip
      />
    </div>
  );
}