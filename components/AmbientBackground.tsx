"use client";
import { useEffect, useRef } from "react";
import { usePaletteStore } from "@/lib/store";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export default function AmbientBackground() {
  const palette = usePaletteStore((s) => s.palette);
  const colors = palette
    ? ([palette.colors.primary, palette.colors.secondary, palette.colors.accent] as [
        string,
        string,
        string
      ])
    : undefined;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetColors = useRef<[number, number, number][]>([
    [124, 58, 237],
    [34, 211, 238],
    [244, 114, 182],
  ]);
  const currentColors = useRef<[number, number, number][]>([...targetColors.current]);

  useEffect(() => {
    if (colors) {
      targetColors.current = colors.map(hexToRgb) as [number, number, number][];
    }
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function lerp(a: number, b: number, n: number) {
      return a + (b - a) * n;
    }

    function draw() {
      t += 0.004;

      currentColors.current = currentColors.current.map((c, i) =>
        c.map((v, j) => lerp(v, targetColors.current[i][j], 0.02)) as [number, number, number]
      );

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const blobs = [
        { x: w * (0.3 + 0.1 * Math.sin(t)), y: h * (0.3 + 0.1 * Math.cos(t * 0.8)), r: w * 0.5, c: currentColors.current[0] },
        { x: w * (0.7 + 0.1 * Math.cos(t * 0.6)), y: h * (0.6 + 0.1 * Math.sin(t * 0.7)), r: w * 0.45, c: currentColors.current[1] },
        { x: w * (0.5 + 0.15 * Math.sin(t * 0.5)), y: h * (0.8 + 0.05 * Math.cos(t)), r: w * 0.4, c: currentColors.current[2] },
      ];

      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.35)`);
        grad.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 bg-[#0A0A0F]"
      style={{ opacity: 0.9 }}
    />
  );
}