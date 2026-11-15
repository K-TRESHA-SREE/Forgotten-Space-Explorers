import { lazy, Suspense, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { equipment, getDestination, getEquipment, STATUS_META, type StatusKind } from "../data";
import { Container, Reveal, SectionHeading } from "../components/ui";
import { StatusBadge } from "../components/StatusBadge";
import { Narrator } from "../components/Narrator";
import { Timeline } from "../components/Timeline";
import { FactSheet } from "../components/FactSheet";
import { FlipCards } from "../components/FlipCards";
import { WatermarkedImage } from "../components/WatermarkedImage";

const ModelViewer = lazy(() => import("../components/three/ModelViewer").then((m) => ({ default: m.ModelViewer })));

function Illustration({ src, alt }: { src: string; alt: string }) {
  return <WatermarkedImage src={src} alt={alt} className="h-full w-full" />;
}

export default function Story() {
  const { id } = useParams();
  const eq = getEquipment(id);
  const [view, setView] = useState<"3d" | "art" | "photo">("3d");
  const hero = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!eq) return <Navigate to="/" replace />;
  const dest = getDestination(eq.destination)!;
  const accent = dest.accent;
  const idx = equipment.findIndex((e) => e.id === eq.id);
  const prev = equipment[(idx + equipment.length - 1) % equipment.length];
  const next = equipment[(idx + 1) % equipment.length];
  const sibling = equipment.find((e) => e.destination === eq.destination && e.id !== eq.id)!;
  const sm = STATUS_META[eq.status];

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section ref={hero} className="relative flex min-h-[84svh] items-end overflow-hidden">
        <WatermarkedImage
          key={eq.id}
          src={eq.image}
          alt={`AI-generated anime-style illustration of ${eq.name}`}
          className="absolute inset-0 h-[115%]"
          position="bottom-right"
          imageMotionProps={{
            style: { y },
            initial: { scale: 1.15, opacity: 0 },
            animate: { scale: 1.05, opacity: 1 },
            transition: { duration: 1.8, ease: [0.2, 0.8, 0.2, 1] },
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] via-[#05071a]/45 to-[#05071a]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05071a]/80 via-transparent to-transparent" />
        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-40 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs tracking-widest text-white/50" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">HOME</Link> / <Link to={`/destination/${dest.id}`} className="hover:text-white" style={{ color: accent }}>{dest.name.toUpperCase()}</Link> / <span className="text-white/70">{eq.name.toUpperCase()}</span>
            </nav>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/25 bg-black/30 px-4 py-1.5 text-xs tracking-[0.25em] text-white/85 backdrop-blur">{eq.years}</span>
              <StatusBadge status={eq.status} />
            </div>
            <h1 className="font-display title-glow max-w-4xl text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">{eq.name}</h1>
            <p className="font-display mt-4 max-w-2xl text-xl text-white/80 sm:text-2xl">{eq.tagline}</p>
          </motion.div>
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4">
            {eq.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-white/40">{s.label}</dt>
                <dd className="font-display mt-1 text-lg font-bold text-white sm:text-xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>

      {/* in-page navigation */}
      <nav aria-label="On this page" className="relative z-10 border-y border-white/10 bg-[#05071a]/70 backdrop-blur">
        <Container className="scroll-hide flex gap-2 overflow-x-auto py-3">
          {[
            ["listen", "Hear its story"],
            ["poem", "Journey poem"],
            ["now", "Where is it now?"],
            ["timeline", "Timeline"],
            ["file", "Mission file"],
            ["facts", "Did you know?"],
            ["sources", "Official sources"],
          ].map(([anchor, label]) => (
            <button
              key={anchor}
              onClick={() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex-none rounded-full px-4 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              {label}
            </button>
          ))}
        </Container>
      </nav>

      {/* ───────── Listen + 3D ───────── */}
      <section id="listen" className="relative scroll-mt-4 py-20">
        <Container>
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-stretch gap-8 lg:grid-cols-2">
            <Reveal className="min-w-0">
              <Narrator chapters={eq.narration} name={eq.name} accent="#ff9fbf" />
            </Reveal>
            <Reveal delay={0.1} className="flex min-w-0 flex-col">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div role="tablist" aria-label="View" className="inline-flex flex-wrap rounded-full border border-white/15 p-1">
                  {(
                    [
                      ["3d", "3D model"],
                      ["art", "Illustration"],
                      ["photo", "Real photo"],
                    ] as const
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      role="tab"
                      aria-selected={view === k}
                      onClick={() => setView(k)}
                      className={`rounded-full px-5 py-2 text-sm transition-all ${view === k ? "bg-white font-bold text-[#05071a]" : "text-white/70 hover:text-white"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="hidden text-xs text-white/40 sm:block">
                  {view === "3d" ? "Drag to rotate · scroll to zoom" : view === "art" ? "AI-generated artwork" : "NASA archival photograph"}
                </span>
              </div>
              <div className="relative min-h-[26rem] flex-1 overflow-hidden rounded-[2rem] border border-white/10 lg:min-h-[34rem]">
                {view === "3d" ? (
                  <Suspense fallback={<div className="flex h-full min-h-[26rem] items-center justify-center text-sm text-white/50">Assembling model…</div>}>
                    <div className="absolute inset-0">
                      <ModelViewer model={eq.model} fallback={                      <Illustration src={eq.image} alt={`AI-generated anime-style illustration of ${eq.name}`} />} />
                    </div>
                  </Suspense>
                ) : view === "art" ? (
                  <motion.div key="art" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                    <Illustration src={eq.image} alt={`AI-generated anime-style illustration of ${eq.name}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="photo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col bg-[#080b20]"
                  >
                    {eq.realPhotos.map((photo) => (
                      <div key={photo.src} className="flex min-h-0 flex-1 flex-col">
                        <div className="relative min-h-0 flex-1">
                          <img src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full object-contain" />
                        </div>
                        <div className="border-t border-white/10 px-5 py-4">
                          <p className="text-sm leading-relaxed text-white/80">{photo.caption}</p>
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/45">
                            <span>Photo: {photo.credit}</span>
                            <a href={photo.source} target="_blank" rel="noreferrer" className="text-aurora hover:underline">
                              View NASA source
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/40">
                {view === "3d"
                  ? "A simplified artistic reconstruction of the machine built for this site, not an official engineering model. Proportions and details are approximate."
                  : view === "art"
                    ? "AI-generated anime-style illustration for storytelling. It is an interpretation, not a photograph."
                    : "NASA archival imagery. Some views show the spacecraft during preparation or from a distance."}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────── Journey poem ───────── */}
      <section id="poem" className="relative scroll-mt-4 py-12 sm:py-16">
        <Container>
          <Reveal>
            <div
              className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border px-6 py-10 text-center sm:px-12 sm:py-14"
              style={{ borderColor: `${accent}55`, background: `linear-gradient(145deg, ${accent}16, rgba(10,16,48,0.72) 58%)` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl" style={{ background: `${accent}22` }} aria-hidden />
              <p className="relative mb-3 text-xs font-medium uppercase tracking-[0.3em]" style={{ color: accent }}>
                A poem for the journey
              </p>
              <h2 className="font-display relative mb-7 text-2xl font-bold text-white sm:text-3xl">{eq.journeyPoem.title}</h2>
              <div className="font-display relative space-y-2 text-lg leading-relaxed text-white/85 sm:text-xl">
                {eq.journeyPoem.lines.map((line, index) => (
                  <p key={`${index}-${line}`}>{line}</p>
                ))}
              </div>
              <p className="relative mt-8 text-xs text-white/45">A creative tribute inspired by this mission's real journey.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── Where is it now ───────── */}
      <section id="now" className="relative scroll-mt-4 py-16">
        <Container>
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2rem] border p-8 sm:p-12"
              style={{ borderColor: `${sm.color}55`, background: `linear-gradient(135deg, ${sm.color}1c, rgba(10,16,48,0.6) 60%)` }}
            >
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl" style={{ background: `${sm.color}30` }} aria-hidden />
              <p className="mb-3 text-xs uppercase tracking-[0.3em]" style={{ color: sm.color }}>Where is it now?</p>
              <h2 className="font-display relative max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">{eq.statusNote}</h2>
              <p className="relative mt-5 max-w-3xl text-lg leading-relaxed text-white/75">{eq.facts.finalStatus}</p>
              <p className="relative mt-4 max-w-3xl text-white/60">
                <span className="mr-2" style={{ color: sm.color }}>📍</span>
                {eq.facts.currentLocation}
              </p>
              <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                {(Object.keys(STATUS_META) as StatusKind[]).map((k) => {
                  const m = STATUS_META[k];
                  const on = k === eq.status;
                  return (
                    <div
                      key={k}
                      className="rounded-2xl border p-4 transition-all"
                      style={{ borderColor: on ? m.color : "rgba(255,255,255,0.1)", background: on ? `${m.color}1f` : "transparent", opacity: on ? 1 : 0.45 }}
                    >
                      <p className="text-sm font-bold" style={{ color: m.color }}>{on ? "● " : "○ "}{m.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/60">{m.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── Timeline ───────── */}
      <section id="timeline" className="relative scroll-mt-4 py-20">
        <Container>
          <SectionHeading kicker="Interactive timeline" title="Step through its life.">
            Select any moment to see what happened. Dates follow NASA mission records.
          </SectionHeading>
          <Reveal>
            <Timeline events={eq.timeline} accent={accent} />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Mission file ───────── */}
      <section id="file" className="relative scroll-mt-4 py-20">
        <Container>
          <SectionHeading kicker="✓ Verified record" title="The mission file.">
            Everything in this section is factual, drawn from NASA and mission-partner sources. Expand the sections to read more.
          </SectionHeading>
          <Reveal>
            <FactSheet eq={eq} accent={accent} />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Fun facts ───────── */}
      <section id="facts" className="relative scroll-mt-4 py-20">
        <Container>
          <SectionHeading kicker="Interesting facts" title="Did you know?">
            Tap a card to flip it.
          </SectionHeading>
          <Reveal>
            <FlipCards items={eq.funFacts} accent={accent} />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Sources ───────── */}
      <section id="sources" className="relative scroll-mt-4 py-20">
        <Container>
          <SectionHeading kicker="Official references" title="Read the originals.">
            Go straight to the source. These NASA and partner pages informed this story.
          </SectionHeading>
          <Reveal>
            <ul className="grid gap-4 md:grid-cols-2">
              {eq.references.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-aurora/50 hover:bg-white/[0.07]"
                  >
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.2em] text-aurora">{r.source}</span>
                      <span className="mt-1 block font-medium text-white">{r.label}</span>
                    </span>
                    <span className="text-xl text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aurora">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ───────── Next ───────── */}
      <section className="relative py-12">
        <Container>
          <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/40">Continue the journey</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { e: prev, label: "← Previous story" },
              { e: sibling, label: `Also at ${dest.name}` },
              { e: next, label: "Next story →" },
            ].map(({ e, label }) => (
              <Link key={label} to={`/story/${e.id}`} className="group relative flex h-44 items-end overflow-hidden rounded-3xl border border-white/10 p-6">
                <WatermarkedImage
                  src={e.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0"
                  imageClassName="transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] to-[#05071a]/40" />
                <div className="relative">
                  <p className="text-xs tracking-widest text-white/55">{label}</p>
                  <p className="font-display text-xl font-bold text-white">{e.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to={`/destination/${dest.id}`} className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
              Back to {dest.name}
            </Link>
            <span className="mx-3 text-white/20">·</span>
            <Link to="/gallery" className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
              All machines
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
