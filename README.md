# 🎨 AuraPalette

Transform your mood into a complete design system — instantly.

AuraPalette takes a simple text description of how you're feeling ("calm and creative", "explosive cyberpunk energy") and uses AI to generate a full, cohesive design theme: color palette, typography, gradients, shadows, and glass effects — then renders a live mini UI dashboard styled entirely in that theme, ready to copy or download as CSS.

## ✨ Features

- **Mood → Design AI**: Natural language mood input generates a structured, validated design token set (Zod-enforced schema)
- **Live theming**: Every part of the preview — buttons, badges, cards, inputs, nav bar — re-skins in real time based on the generated palette
- **Dynamic fonts**: Automatically loads and applies the AI-selected Google Font per mood, so different moods feel visually distinct, not just color-different
- **Ambient mood-reactive background**: A canvas-based animated gradient smoothly shifts its colors to match whatever mood you just generated
- **CSS export**: One-click copy to clipboard or download as a standalone `.css` file with CSS custom properties
- **Smooth, animated UX**: Framer Motion throughout — staggered swatch reveals with spring physics, scroll-triggered reveals, hover tilt effects, toast notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State**: Zustand
- **Validation**: Zod
- **AI**: Groq API (Llama 3.3 70B) for structured JSON generation
- **Smooth scroll**: Lenis

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A free [Groq API key](https://console.groq.com/keys)

### Setup

```bash
git clone https://github.com/Arpitaparul14/aurapalette.git
cd aurapalette
npm install
```

Create a `.env.local` file in the root:
GROQ_API_KEY=your_key_here
Run the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📸 How it works

1. Type a mood or vibe into the input
2. The API route sends a structured prompt to Groq, requesting a strict JSON schema (colors, gradient, font, radius, shadow, glass, animation)
3. The response is validated against a Zod schema before rendering — malformed AI output is caught and surfaced as a clean error instead of crashing the UI
4. The validated palette drives every visual element on the page, live

## 🗺️ Possible next steps

- Save/favorite generated themes
- Export as Tailwind config or SCSS variables
- Shareable palette links
- Accessibility/contrast scoring on generated palettes

## 📄 License

MIT
