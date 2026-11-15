import { useEffect, useRef } from "react";

/** Fixed, lightweight 2D canvas starfield with twinkling and occasional shooting stars. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; p: number; s: number; hue: number };
    let stars: Star[] = [];
    const shooters: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const resize = () => {
      w = document.documentElement.clientWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 5500);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 1.5 + 0.4,
        hue: Math.random() < 0.2 ? 200 : Math.random() < 0.3 ? 340 : 45,
      }));
    };

    let last = performance.now();
    let nextShoot = last + 4000;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = reduced ? 0.7 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now / 1000 * s.s + s.p));
        ctx.globalAlpha = a;
        ctx.fillStyle = `hsl(${s.hue} 90% 88%)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) {
        if (now > nextShoot) {
          nextShoot = now + 6000 + Math.random() * 9000;
          shooters.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: 520, vy: 240, life: 1 });
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i];
          sh.x += sh.vx * dt;
          sh.y += sh.vy * dt;
          sh.life -= dt * 1.1;
          if (sh.life <= 0) {
            shooters.splice(i, 1);
            continue;
          }
          const g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 0.18, sh.y - sh.vy * 0.18);
          g.addColorStop(0, `rgba(255,255,255,${sh.life})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(sh.x - sh.vx * 0.18, sh.y - sh.vy * 0.18);
          ctx.stroke();
        }
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) draw(performance.now());
    else raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(120,90,255,0.18), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 30%, rgba(255,140,180,0.10), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 110%, rgba(60,200,255,0.12), transparent 60%), linear-gradient(180deg,#05071a 0%,#070b24 50%,#05071a 100%)",
        }}
      />
      <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
    </>
  );
}
