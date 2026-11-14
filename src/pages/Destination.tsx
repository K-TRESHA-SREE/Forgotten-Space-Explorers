import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations, equipmentForDestination, getDestination, STATUS_META } from "../data";
import { Container, Reveal, SectionHeading } from "../components/ui";
import { EquipmentCard } from "../components/EquipmentCard";

export default function Destination() {
  const { id } = useParams();
  const dest = getDestination(id);
  if (!dest) return <Navigate to="/" replace />;
  const eqs = equipmentForDestination(dest.id);
  const idx = destinations.findIndex((d) => d.id === dest.id);
  const prev = destinations[(idx + destinations.length - 1) % destinations.length];
  const next = destinations[(idx + 1) % destinations.length];

  return (
    <>
      <section className="relative flex min-h-[78svh] items-end overflow-hidden">
        <motion.img
          key={dest.id}
          src={dest.image}
          alt={`${dest.name} — anime-style illustration`}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] via-[#05071a]/50 to-[#05071a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05071a]/80 to-transparent" />
        <Container className="pb-16 pt-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <nav className="mb-6 text-xs tracking-widest text-white/50" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">HOME</Link> <span className="mx-2">/</span> DESTINATION
            </nav>
            <h1 className="font-display title-glow text-5xl font-extrabold text-white sm:text-7xl lg:text-8xl">{dest.name}</h1>
            <p className="font-display mt-4 text-2xl text-white/80 sm:text-3xl">{dest.tagline}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{dest.description}</p>
          </motion.div>
        </Container>
      </section>

      <section className="relative py-20">
        <Container>
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {dest.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <div className="glass h-full rounded-2xl p-5">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">{f.label}</dt>
                  <dd className="font-display mt-2 text-lg font-bold leading-snug sm:text-xl" style={{ color: dest.accent }}>{f.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-10">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent p-7 sm:p-9">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">Why did they stay?</p>
              <p className="font-display max-w-3xl text-xl leading-relaxed text-white/90 sm:text-2xl">{dest.whyLeft}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <SectionHeading kicker={`Two machines at ${dest.name}`} title="Meet the explorers.">
            Open either one to hear its story, explore its 3D model, step through its timeline and read the verified mission file.
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-2">
            {eqs.map((e, i) => (
              <EquipmentCard key={e.id} eq={e} index={i} tall />
            ))}
          </div>

          <Reveal className="mt-14">
            <h3 className="font-display mb-5 text-2xl font-bold text-white">At a glance</h3>
            <div className="overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead>
                  <tr className="bg-white/[0.05] text-xs uppercase tracking-[0.2em] text-white/50">
                    <th className="p-4 font-medium"> </th>
                    {eqs.map((e) => (
                      <th key={e.id} className="p-4 font-display text-base normal-case tracking-normal text-white">{e.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/75">
                  {[
                    ["Years", (e: (typeof eqs)[number]) => e.years],
                    ["Launched", (e: (typeof eqs)[number]) => e.stats[0].value],
                    ["Where is it now?", (e: (typeof eqs)[number]) => STATUS_META[e.status].label],
                    ["Location", (e: (typeof eqs)[number]) => e.facts.currentLocation],
                  ].map(([label, fn]) => (
                    <tr key={label as string}>
                      <th className="p-4 align-top text-xs font-medium uppercase tracking-[0.15em] text-white/45">{label as string}</th>
                      {eqs.map((e) => (
                        <td key={e.id} className="p-4 align-top leading-relaxed">{(fn as (e: (typeof eqs)[number]) => string)(e)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-10">
        <Container>
          <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/40">Keep exploring, in any order</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{ d: prev, label: "← Previous" }, { d: next, label: "Next →" }].map(({ d, label }) => (
              <Link
                key={d.id}
                to={`/destination/${d.id}`}
                className="group relative flex h-40 items-end overflow-hidden rounded-3xl border border-white/10 p-6"
              >
                <img src={d.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] to-[#05071a]/40" />
                <div className="relative">
                  <p className="text-xs tracking-widest text-white/50">{label}</p>
                  <p className="font-display text-2xl font-bold text-white">{d.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {destinations.map((d) => (
              <Link
                key={d.id}
                to={`/destination/${d.id}`}
                className={`rounded-full border px-4 py-2 text-sm transition ${d.id === dest.id ? "border-transparent text-[#05071a]" : "border-white/15 text-white/70 hover:border-white/40"}`}
                style={d.id === dest.id ? { background: d.accent } : undefined}
              >
                {d.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
