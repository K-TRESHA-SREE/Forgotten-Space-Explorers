import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Equipment } from "../data";
import { getDestination } from "../data";
import { StatusBadge } from "./StatusBadge";
import { WatermarkedImage } from "./WatermarkedImage";

export function EquipmentCard({ eq, index = 0, tall = false }: { eq: Equipment; index?: number; tall?: boolean }) {
  const dest = getDestination(eq.destination)!;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="h-full"
    >
      <Link
        to={`/story/${eq.id}`}
        className={`group card-tilt relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-night shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] ${
          tall ? "min-h-[26rem]" : "min-h-[22rem]"
        }`}
        style={{ ["--accent" as string]: dest.accent }}
      >
        <WatermarkedImage
          src={eq.image}
          alt={`AI-generated anime-style illustration of ${eq.name}`}
          loading="lazy"
          className="absolute inset-0"
          imageClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] via-[#05071a]/55 to-transparent" />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 70% 20%, ${dest.accent}33, transparent 55%)` }}
        />
        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs tracking-widest text-white/80 backdrop-blur">
            {dest.name.toUpperCase()} · {eq.years}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
          <StatusBadge status={eq.status} compact />
          <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-[1.7rem]">{eq.name}</h3>
          <p className="text-sm leading-relaxed text-white/70">{eq.tagline}</p>
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-aurora">
            Hear its story
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
