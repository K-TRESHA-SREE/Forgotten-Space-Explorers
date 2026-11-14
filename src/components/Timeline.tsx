import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TimelineEvent } from "../data";

export function Timeline({ events, accent }: { events: TimelineEvent[]; accent: string }) {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setI(0);
  }, [events]);

  useEffect(() => {
    const el = refs.current[i];
    const sc = scroller.current;
    if (el && sc) sc.scrollTo({ left: el.offsetLeft - sc.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [i]);

  const e = events[i];
  const pct = events.length > 1 ? (i / (events.length - 1)) * 100 : 0;

  return (
    <div>
      <div ref={scroller} className="scroll-hide -mx-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
        <ol className="relative flex min-w-max items-start gap-0 pt-2" aria-label="Mission timeline">
          {/* track */}
          <div className="absolute left-[4.5rem] right-[4.5rem] top-[1.35rem] h-px bg-white/15" aria-hidden />
          <div
            className="absolute left-[4.5rem] top-[1.35rem] h-px transition-all duration-700"
            style={{ width: `calc((100% - 9rem) * ${pct / 100})`, background: `linear-gradient(90deg, ${accent}, #7ff0ff)`, boxShadow: `0 0 12px ${accent}` }}
            aria-hidden
          />
          {events.map((ev, k) => {
            const active = k === i;
            const past = k < i;
            return (
              <li key={k} className="w-36 flex-none">
                <button
                  ref={(el) => {
                    refs.current[k] = el;
                  }}
                  onClick={() => setI(k)}
                  aria-current={active ? "step" : undefined}
                  className="group flex w-full flex-col items-center gap-3 px-2 text-center"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    {active && <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: accent }} />}
                    <span
                      className="relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 group-hover:scale-150"
                      style={{
                        borderColor: active || past ? accent : "rgba(255,255,255,0.4)",
                        background: active || past ? accent : "#05071a",
                        transform: active ? "scale(1.45)" : undefined,
                      }}
                    />
                  </span>
                  <span className={`text-xs font-bold tracking-wide transition-colors ${active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{ev.date}</span>
                  <span className={`text-xs leading-snug transition-colors ${active ? "text-white/90" : "text-white/40"}`}>{ev.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: `${accent}33` }} aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative min-h-[6.5rem]"
          >
            <p className="text-xs font-bold tracking-[0.25em]" style={{ color: accent }}>{e.date.toUpperCase()}</p>
            <h4 className="font-display mt-1 text-2xl font-bold text-white">{e.title}</h4>
            <p className="mt-2 max-w-2xl leading-relaxed text-white/70">{e.text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="relative mt-5 flex items-center gap-3">
          <button
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-30"
          >
            ← Earlier
          </button>
          <button
            onClick={() => setI((v) => Math.min(events.length - 1, v + 1))}
            disabled={i === events.length - 1}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-30"
          >
            Later →
          </button>
          <span className="ml-auto text-xs text-white/40">
            {i + 1} / {events.length}
          </span>
        </div>
      </div>
    </div>
  );
}
