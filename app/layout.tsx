import SmoothScroll from "@/lib/lenis";
import AmbientBackground from "@/components/AmbientBackground";
import ParticleField from "@/components/ParticleField";
import "./globals.css";

export const metadata = {
  title: "AuraPalette",
  description: "Transform your mood into beautiful design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0F] text-white">
        <AmbientBackground />
        <ParticleField />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}