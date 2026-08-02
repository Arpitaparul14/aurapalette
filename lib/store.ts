import { create } from "zustand";
import { Palette } from "./schema";

interface PaletteStore {
  palette: Palette | null;
  loading: boolean;
  error: string | null;
  generate: (mood: string) => Promise<void>;
}

export const usePaletteStore = create<PaletteStore>((set) => ({
  palette: null,
  loading: false,
  error: null,
  generate: async (mood: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      set({ palette: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));