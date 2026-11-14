import { useState } from "react";

export function FlipCards({ items, accent }: { items: { front: string; back: string }[]; accent: string }) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((it, i) => (
        <button
          key={i}
          onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
          data-flipped={!!flipped[i]}
          aria-pressed={!!flipped[i]}
          aria-label={`Fun fact ${i + 1}: ${it.front}. Press to ${flipped[i] ? "hide" : "reveal"} the answer.`}
          className="flip-card relative block h-64 w-full text-left sm:h-60"
        >
          <span className="flip-inner relative block h-full w-full">
            <span
              className="flip-face absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/10 p-6"
              style={{ background: `linear-gradient(150deg, ${accent}26, rgba(10,16,48,0.85))` }}
            >
              <span className="text-xs tracking-[0.3em]" style={{ color: accent }}>DID YOU KNOW? · {String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl font-bold leading-snug text-white">{it.front}</span>
              <span className="text-xs text-white/50">Tap to reveal ↻</span>
            </span>
            <span
              className="flip-face flip-back absolute inset-0 flex flex-col justify-center rounded-3xl border p-6"
              style={{ borderColor: `${accent}66`, background: `linear-gradient(150deg, rgba(10,16,48,0.95), ${accent}30)` }}
            >
              <span className="text-sm leading-relaxed text-white/90 sm:text-[0.95rem]">{it.back}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
