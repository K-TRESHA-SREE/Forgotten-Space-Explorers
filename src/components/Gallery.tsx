import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { destinations, equipment, STATUS_META, type DestinationId, type StatusKind } from "../data";
import { EquipmentCard } from "./EquipmentCard";

export function Gallery() {
  const [dest, setDest] = useState<DestinationId | "all">("all");
  const [status, setStatus] = useState<StatusKind | "all">("all");
  const [sort, setSort] = useState<"place" | "year">("place");

  const list = useMemo(() => {
    const l = equipment.filter((e) => (dest === "all" || e.destination === dest) && (status === "all" || e.status === status));
    return sort === "year" ? [...l].sort((a, b) => a.yearStart - b.yearStart) : l;
  }, [dest, status, sort]);

  const chip = (active: boolean, color?: string) =>
    `rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
      active ? "border-transparent font-medium text-[#05071a]" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
    }` + (color ? "" : "");

  return (
    <div>
      <div className="mb-10 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:grid-cols-[1fr_1fr_auto]">
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/40">Destination</legend>
          <div className="flex flex-wrap gap-2">
            <button className={chip(dest === "all")} style={dest === "all" ? { background: "#fff" } : undefined} aria-pressed={dest === "all"} onClick={() => setDest("all")}>
              All
            </button>
            {destinations.map((d) => (
              <button key={d.id} className={chip(dest === d.id)} style={dest === d.id ? { background: d.accent } : undefined} aria-pressed={dest === d.id} onClick={() => setDest(d.id)}>
                {d.name}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/40">Where is it now?</legend>
          <div className="flex flex-wrap gap-2">
            <button className={chip(status === "all")} style={status === "all" ? { background: "#fff" } : undefined} aria-pressed={status === "all"} onClick={() => setStatus("all")}>
              All
            </button>
            {(Object.keys(STATUS_META) as StatusKind[]).map((s) => (
              <button key={s} className={chip(status === s)} style={status === s ? { background: STATUS_META[s].color } : undefined} aria-pressed={status === s} onClick={() => setStatus(s)}>
                {STATUS_META[s].short}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/40">Order</legend>
          <div className="flex gap-2">
            <button className={chip(sort === "place")} style={sort === "place" ? { background: "#fff" } : undefined} aria-pressed={sort === "place"} onClick={() => setSort("place")}>
              By world
            </button>
            <button className={chip(sort === "year")} style={sort === "year" ? { background: "#fff" } : undefined} aria-pressed={sort === "year"} onClick={() => setSort("year")}>
              By year
            </button>
          </div>
        </fieldset>
      </div>

      <p className="mb-6 text-sm text-white/45" aria-live="polite">
        Showing {list.length} of {equipment.length} machines
      </p>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((e, i) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
            >
              <EquipmentCard eq={e} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="py-16 text-center text-white/50">No machines match this combination. Try another filter.</p>}
    </div>
  );
}
