import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { destinations, equipmentForDestination, getDestination, type DestinationId } from "../data";
import { StatusBadge } from "./StatusBadge";

type Body = {
  key: string;
  size: number; // orbit diameter, % of container
  dur: number;
  delay: number;
  d: number; // body diameter in cqw
  bg: string;
  label: string;
  dest?: DestinationId;
  ring?: boolean;
};

const BODIES: Body[] = [
  { key: "mercury", size: 14, dur: 16, delay: -4, d: 1.8, bg: "radial-gradient(circle at 30% 30%,#d7d2ca,#8d8982 58%,#514f4c)", label: "Mercury" },
  { key: "venus", size: 22, dur: 28, delay: -6, d: 2.8, bg: "radial-gradient(circle at 30% 30%,#fff0c0,#e0a85c 55%,#8f5a28)", label: "Venus", dest: "venus" },
  { key: "earth", size: 30, dur: 38, delay: -20, d: 3.1, bg: "radial-gradient(circle at 30% 30%,#9fe0ff,#2f7fe0 55%,#173a86)", label: "Earth" },
  { key: "mars", size: 40, dur: 52, delay: -33, d: 2.6, bg: "radial-gradient(circle at 30% 30%,#ffb08a,#d4562b 60%,#7b2c16)", label: "Mars", dest: "mars" },
  { key: "jupiter", size: 60, dur: 95, delay: -50, d: 5.8, bg: "linear-gradient(180deg,#e8cfb0 0 18%,#b9885f 18% 34%,#efe0c9 34% 52%,#a8744c 52% 68%,#e3c8a6 68% 84%,#9a6a46 84%)", label: "Jupiter" },
  { key: "saturn", size: 72, dur: 125, delay: -90, d: 5.0, bg: "linear-gradient(180deg,#f1dfae 0 25%,#d8bd86 25% 55%,#efe0b4 55% 80%,#c9a96a 80%)", label: "Saturn", ring: true },
  { key: "uranus", size: 84, dur: 160, delay: -115, d: 3.8, bg: "radial-gradient(circle at 30% 30%,#d5ffff,#75d4d7 58%,#397d94)", label: "Uranus" },
  { key: "neptune", size: 94, dur: 205, delay: -145, d: 3.8, bg: "radial-gradient(circle at 30% 30%,#9ebcff,#4169dc 58%,#202e83)", label: "Neptune" },
];

function seeded(n: number) {
  let s = n * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Spin({ size, dur, delay, children, className = "" }: { size: number; dur: number; delay: number; children: ReactNode; className?: string }) {
  const style: CSSProperties = { animationDuration: `${dur}s`, animationDelay: `${delay}s` };
  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ left: "50%", top: "50%", width: `${size}%`, height: `${size}%`, transform: "translate(-50%,-50%)" }}
    >
      <div className="orbit-spin pointer-events-none absolute inset-0" style={style}>
        {children}
      </div>
    </div>
  );
}

function Pin({ dur, delay, children }: { dur: number; delay: number; children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
      <div className="orbit-counter" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

export function SolarSystem() {
  const [sel, setSel] = useState<DestinationId | null>(null);
  const destinationPanel = useRef<HTMLDivElement>(null);
  const dest = getDestination(sel ?? undefined);

  const belt = useMemo(() => {
    const r = seeded(11);
    return Array.from({ length: 110 }, () => {
      const a = r() * Math.PI * 2;
      const j = (r() - 0.5) * 4.5;
      return { x: 50 + (50 + j) * Math.cos(a), y: 50 + (50 + j) * Math.sin(a), s: 0.25 + r() * 0.45, o: 0.3 + r() * 0.6 };
    });
  }, []);

  const pick = (id: DestinationId) => {
    setSel(id);
    destinationPanel.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const Label = ({ children, active }: { children: ReactNode; active?: boolean }) => (
    <span
      className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] tracking-wider backdrop-blur sm:text-[11px] ${
        active ? "bg-aurora/90 font-bold text-[#05071a]" : "bg-black/40 text-white/75"
      }`}
    >
      {children}
    </span>
  );

  const DestButton = ({ id, label, children, style }: { id: DestinationId; label: string; children?: ReactNode; style: CSSProperties }) => {
    const active = sel === id;
    return (
      <button
        onClick={() => pick(id)}
        onFocus={() => undefined}
        aria-label={`Explore ${label}`}
        aria-controls="destination-details"
        aria-pressed={active}
        title={`Explore ${label}`}
        className="group pointer-events-auto relative z-10 block cursor-pointer rounded-full transition-transform duration-300 hover:scale-125 focus-visible:scale-125"
        style={style}
      >
        {children}
        <span className="absolute -inset-2 rounded-full border border-aurora/60 animate-pulse-ring" />
        {active && <span className="absolute -inset-1.5 rounded-full border-2 border-aurora shadow-[0_0_18px_#7ff0ff]" />}
        <Label active={active}>{label}</Label>
      </button>
    );
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* ───────── Orrery ───────── */}
      <div>
        <div
          className="orbit-system relative mx-auto aspect-square w-full max-w-[760px] select-none"
          style={{ containerType: "inline-size" }}
        >
          {/* faint disc glow */}
          <div className="absolute inset-[2%] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,207,122,0.10), rgba(127,240,255,0.04) 40%, transparent 70%)" }} />

          {/* Sun */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-float"
            style={{
              width: "8cqw",
              height: "8cqw",
              background: "radial-gradient(circle at 35% 35%,#fff7d0,#ffcf5a 45%,#ff8a3c 85%)",
              boxShadow: "0 0 60px 20px rgba(255,170,70,.45), 0 0 140px 50px rgba(255,120,60,.18)",
            }}
          />

          {/* Orbit rings + inner planets */}
          {BODIES.map((b) => (
            <Spin key={b.key} size={b.size} dur={b.dur} delay={b.delay} className="border border-white/10">
              <Pin dur={b.dur} delay={b.delay}>
                {b.dest ? (
                  <DestButton id={b.dest} label={b.label} style={{ width: `${b.d}cqw`, height: `${b.d}cqw`, background: b.bg, boxShadow: "inset -4px -4px 8px rgba(0,0,0,.45)" }} />
                ) : (
                  <div className="relative rounded-full" style={{ width: `${b.d}cqw`, height: `${b.d}cqw`, background: b.bg, boxShadow: "inset -4px -4px 8px rgba(0,0,0,.45)" }}>
                    {b.ring && (
                      <span className="absolute left-1/2 top-1/2 h-[55%] w-[230%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border-2 border-[#e8d3a0]/70" />
                    )}
                    {/* Earth's Moon */}
                    {b.key === "earth" && (
                      <div className="absolute left-1/2 top-1/2 h-0 w-0">
                        <div className="absolute rounded-full border border-white/10" style={{ width: "9cqw", height: "9cqw", left: "-4.5cqw", top: "-4.5cqw" }}>
                          <div className="orbit-spin absolute inset-0" style={{ animationDuration: "9s" }}>
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                              <div className="orbit-counter" style={{ animationDuration: "9s" }}>
                                <DestButton
                                  id="moon"
                                  label="Moon"
                                  style={{ width: "1.9cqw", height: "1.9cqw", background: "radial-gradient(circle at 30% 30%,#fff,#b8bdd0 60%,#6d7186)", minWidth: 14, minHeight: 14 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <Label>{b.label}</Label>
                  </div>
                )}
              </Pin>
            </Spin>
          ))}

          {/* Asteroid belt */}
          <Spin size={50} dur={160} delay={0}>
            {belt.map((a, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#cdbfa8]"
                style={{ left: `${a.x}%`, top: `${a.y}%`, width: `${a.s}cqw`, height: `${a.s}cqw`, opacity: a.o, transform: "translate(-50%,-50%)" }}
              />
            ))}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="orbit-counter" style={{ animationDuration: "160s" }}>
                <DestButton
                  id="asteroids"
                  label="Asteroids"
                  style={{ width: "2.4cqw", height: "2.4cqw", background: "radial-gradient(circle at 30% 30%,#d9cdb8,#8a7d6a 60%,#4d4438)", borderRadius: "40% 60% 55% 45%", minWidth: 16, minHeight: 16 }}
                />
              </div>
            </div>
          </Spin>

          {/* Deep space ring */}
          <Spin size={97} dur={260} delay={-70} className="border border-dashed border-violet/30">
            <Pin dur={260} delay={-70}>
              <DestButton id="deep-space" label="Deep Space" style={{ width: "3.2cqw", height: "3.2cqw", minWidth: 20, minHeight: 20 }}>
                <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#a99bff" strokeWidth="1.6" aria-hidden>
                  <circle cx="12" cy="12" r="5" fill="#a99bff22" />
                  <path d="M12 7V2M12 22v-5M7 12H2M22 12h-5" strokeLinecap="round" />
                </svg>
              </DestButton>
            </Pin>
          </Spin>
        </div>
        <p className="mt-4 text-center text-xs tracking-wide text-white/45">
          The eight planets orbit in order from the Sun · Select a highlighted destination to explore it
        </p>
      </div>

      {/* ───────── Destination panel ───────── */}
      <div id="destination-details" ref={destinationPanel} className="min-h-[28rem] scroll-mt-24">
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Destinations">
          {destinations.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={sel === d.id}
              aria-controls="destination-details"
              onClick={() => pick(d.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                sel === d.id ? "border-transparent text-[#05071a]" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
              style={sel === d.id ? { background: d.accent } : undefined}
            >
              {d.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {dest ? (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass overflow-hidden rounded-3xl"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={dest.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1030] to-transparent" />
                <div className="absolute bottom-3 left-6">
                  <h3 className="font-display text-3xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>
              <div className="space-y-5 p-6">
                <p className="text-sm leading-relaxed text-white/70">{dest.description}</p>
                <ul className="space-y-2">
                  {equipmentForDestination(dest.id).map((e) => (
                    <li key={e.id}>
                      <Link
                        to={`/story/${e.id}`}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07]"
                      >
                        <img src={e.image} alt="" className="h-16 w-16 flex-none rounded-xl object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-lg font-bold text-white">{e.name}</span>
                          <span className="mb-1 block text-xs text-white/50">{e.years}</span>
                          <StatusBadge status={e.status} compact />
                        </span>
                        <span className="text-aurora transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/destination/${dest.id}`}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:gap-4"
                  style={{ borderColor: `${dest.accent}88`, color: dest.accent }}
                >
                  Enter {dest.name} <span>→</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-3xl p-10 text-center"
            >
              <span className="font-display text-6xl text-white/20" aria-hidden>✦</span>
              <p className="font-display text-2xl text-white">Choose a world to begin</p>
              <p className="max-w-xs text-sm leading-relaxed text-white/55">
                The eight planets are shown in order from the Sun. Choose a highlighted destination in the orrery, or pick one above, to meet its explorers.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
