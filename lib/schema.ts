import { z } from "zod";

export const PaletteSchema = z.object({
  mood: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    text: z.string(),
  }),
  gradient: z.string(),
  font: z.string(),
  radius: z.string(),
  shadow: z.enum(["none", "soft", "medium", "hard"]),
  glass: z.boolean(),
  animation: z.enum(["none", "float", "pulse", "fade"]),
});

export type Palette = z.infer<typeof PaletteSchema>;