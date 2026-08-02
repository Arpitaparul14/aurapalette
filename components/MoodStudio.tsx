"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaletteStore } from "@/lib/store";
import { Sparkles, Loader2, Copy, Download, Check, Bell, Search } from "lucide-react";

export default function MoodStudio() {
  const [mood, setMood] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const { palette, loading, error, generate } = usePaletteStore();

  useEffect(() => {
    if (!palette?.font) return;
    const linkId = "dynamic-google-font";
    document.getElementById(linkId)?.remove();
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${palette.font.replace(
      / /g,
      "+"
    )}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }, [palette?.font]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  function buildCss() {
    if (!palette) return "";
    return `:root {
  --primary: ${palette.colors.primary};
  --secondary: ${palette.colors.secondary};
  --accent: ${palette.colors.accent};
  --background: ${palette.colors.background};
  --text: ${palette.colors.text};
  --gradient: ${palette.gradient};
  --font: "${palette.font}";
  --radius: ${palette.radius};
}`;
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildCss());
    showToast("CSS copied to clipboard");
  }

  function handleDownload() {
    const blob = new Blob([buildCss()], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aurapalette-theme.css";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Theme downloaded");
  }

  const shadowStyle =
    palette?.shadow === "hard"
      ? "8px 8px 0px rgba(0,0,0,0.3)"
      : palette?.shadow === "medium"
      ? "0 8px 24px rgba(0,0,0,0.25)"
      : palette?.shadow === "soft"
      ? "0 4px 16px rgba(0,0,0,0.15)"
      : "none";

  return (
    <section id="studio" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-3"
      >
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && mood && generate(mood)}
          placeholder="Describe your current mood..."
          className="flex-1 bg-transparent outline-none placeholder:text-white/40 text-white"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => mood && generate(mood)}
          disabled={loading}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-2 rounded-xl font-medium"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          Generate
        </motion.button>
      </motion.div>

      {error && <p className="text-red-400">{error}</p>}

      <AnimatePresence>
        {palette && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            style={{ borderRadius: palette.radius, fontFamily: palette.font }}
          >
            <p className="text-white/50 text-sm mb-4">Mood: {palette.mood}</p>

            <motion.div
              className="flex gap-3 mb-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {Object.entries(palette.colors).map(([key, hex]) => (
                <motion.div
                  key={key}
                  className="flex-1 text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.8 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-full h-16 rounded-lg mb-1" style={{ background: hex as string }} />
                  <span className="text-xs text-white/50">{key}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="h-24 rounded-xl mb-6" style={{ background: palette.gradient }} />

            {/* Full mini dashboard */}
            <div
              className="mb-6 rounded-xl border overflow-hidden"
              style={{
                background: palette.colors.background,
                borderColor: palette.colors.secondary,
                borderRadius: palette.radius,
                color: palette.colors.text,
                boxShadow: shadowStyle,
                backdropFilter: palette.glass ? "blur(12px)" : "none",
              }}
            >
              {/* nav bar */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: palette.colors.secondary }}
              >
                <span className="font-semibold text-sm">Dashboard</span>
                <div className="flex items-center gap-3">
                  <Search size={16} style={{ color: palette.colors.text }} />
                  <Bell size={16} style={{ color: palette.colors.text }} />
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: palette.colors.accent, color: palette.colors.background }}
                  >
                    A
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs opacity-60 mb-3">Live preview</p>

                {/* badges */}
                <div className="flex gap-2 mb-4">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: palette.colors.primary, color: palette.colors.background }}
                  >
                    Primary
                  </span>
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: palette.colors.secondary, color: palette.colors.background }}
                  >
                    Secondary
                  </span>
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: palette.colors.accent, color: palette.colors.background }}
                  >
                    Accent
                  </span>
                </div>

                {/* card */}
                <div
                  className="flex items-center gap-3 mb-4 p-3 rounded-lg"
                  style={{ border: `1px solid ${palette.colors.secondary}`, borderRadius: palette.radius }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: palette.colors.accent, color: palette.colors.background }}
                  >
                    ✦
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sample Card</p>
                    <p className="text-xs opacity-60">Styled with your palette</p>
                  </div>
                </div>

                {/* input */}
                <input
                  placeholder="Input field..."
                  className="w-full px-3 py-2 mb-3 text-sm outline-none border"
                  style={{
                    borderRadius: palette.radius,
                    borderColor: palette.colors.secondary,
                    background: "transparent",
                    color: palette.colors.text,
                  }}
                />

                {/* buttons row */}
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-sm font-medium"
                    style={{
                      background: palette.colors.primary,
                      color: palette.colors.background,
                      borderRadius: palette.radius,
                    }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium border"
                    style={{
                      borderColor: palette.colors.primary,
                      color: palette.colors.primary,
                      borderRadius: palette.radius,
                      background: "transparent",
                    }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl text-sm"
              >
                <Copy size={14} />
                Copy CSS
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl text-sm"
              >
                <Download size={14} />
                Download CSS
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium z-50"
          >
            <Check size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}