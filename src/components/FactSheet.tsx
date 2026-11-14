import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Equipment } from "../data";

type Section = { id: string; title: string; icon: string; body: string | string[] };

export function FactSheet({ eq, accent }: { eq: Equipment; accent: string }) {
  const f = eq.facts;
  const sections: Section[] = [
    { id: "mission", title: "Mission", icon: "🚀", body: f.mission },
    { id: "launch", title: "Launch date", icon: "📅", body: f.launchDate },
    { id: "purpose", title: "Purpose", icon: "🎯", body: f.purpose },
    { id: "background", title: "Historical background", icon: "📜", body: f.background },
    { id: "journey", title: "The journey", icon: "🛰️", body: f.journey },
    { id: "events", title: "Major events", icon: "⭐", body: f.majorEvents },
    { id: "discoveries", title: "Scientific discoveries", icon: "🔭", body: f.discoveries },
    { id: "achievements", title: "Achievements", icon: "🏆", body: f.achievements },
    { id: "challenges", title: "Challenges", icon: "⚠️", body: f.challenges },
    { id: "final", title: "Final operational status", icon: "🔚", body: f.finalStatus },
    { id: "location", title: "Current location", icon: "📍", body: f.currentLocation },
    { id: "significance", title: "Historical significance", icon: "✨", body: f.significance },
  ];
  const [open, setOpen] = useState<Set<string>>(new Set(["mission", "final"]));
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const allOpen = open.size === sections.length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">Official name</p>
          <p className="font-display text-xl font-bold text-white sm:text-2xl">{eq.officialName}</p>
        </div>
        <button
          onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((s) => s.id)))}
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 transition hover:border-white/50 hover:bg-white/10"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        {sections.map((s) => {
          const isOpen = open.has(s.id);
          return (
            <div key={s.id}>
              <h3>
                <button
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${s.id}`}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] sm:px-7"
                >
                  <span className="text-xl" aria-hidden>{s.icon}</span>
                  <span className="font-display flex-1 text-lg font-bold text-white sm:text-xl">{s.title}</span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-lg leading-none transition-transform duration-300"
                    style={{ borderColor: `${accent}66`, color: accent, transform: isOpen ? "rotate(45deg)" : undefined }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${s.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pl-[4.25rem] pr-5 sm:pl-[4.75rem] sm:pr-8">
                      {Array.isArray(s.body) ? (
                        <ul className="space-y-2.5">
                          {s.body.map((b, i) => (
                            <li key={i} className="flex gap-3 leading-relaxed text-white/75">
                              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full" style={{ background: accent }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="leading-relaxed text-white/75">{s.body}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
