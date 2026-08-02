import { NextRequest, NextResponse } from "next/server";
import { PaletteSchema } from "@/lib/schema";

export async function POST(req: NextRequest) {
  const { mood } = await req.json();
  if (!mood || typeof mood !== "string") {
    return NextResponse.json({ error: "Mood text required" }, { status: 400 });
  }

  const prompt = `Convert this mood into a bold, distinctive design palette. Be dramatic and specific — avoid generic pastels unless the mood truly calls for softness. A mood like "energetic" or "cyberpunk" should look nothing like "calm" or "minimal". Push contrast and saturation to match the emotional intensity of the mood.

Return ONLY valid JSON, no markdown formatting, with this exact shape:
{
  "mood": string,
  "colors": {"primary": hex, "secondary": hex, "accent": hex, "background": hex, "text": hex},
  "gradient": "linear-gradient(...) CSS value",
  "font": "a real Google Font name that matches the mood's personality (e.g. Playfair Display for elegant, Bebas Neue for bold, Pacifico for playful, Space Mono for techy)",
  "radius": "e.g. 4px for sharp/serious moods, 24px for soft/playful moods",
  "shadow": "none" | "soft" | "medium" | "hard",
  "glass": boolean,
  "animation": "none" | "float" | "pulse" | "fade"
}
Mood: "${mood}"`;

  const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    }),
  });

  const data = await aiRes.json();

  try {
    const parsed = JSON.parse(data.choices[0].message.content);
    const validated = PaletteSchema.parse(parsed);
    return NextResponse.json(validated);
  } catch (err) {
    console.error("Groq raw:", JSON.stringify(data));
    return NextResponse.json({ error: "AI returned invalid palette shape" }, { status: 502 });
  }
}