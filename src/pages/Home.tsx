import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations, equipment, getEquipment, STATUS_META, type StatusKind } from "../data";
import { IMG } from "../data/images";
import { Container, Reveal, SectionHeading } from "../components/ui";
import { SolarSystem } from "../components/SolarSystem";
import { Gallery } from "../components/Gallery";
import { useGoToSection } from "../components/Layout";
import { WatermarkedImage } from "../components/WatermarkedImage";

const HeroScene = lazy(() => import("../components/three/ModelViewer").then((m) => ({ default: m.HeroScene })));

function Hero() {
  const go = useGoToSection();
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <WatermarkedImage src={IMG.pioneer10} alt="" className="absolute inset-0" imageClassName="opacity-40" position="bottom-right" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05071a] via-[#05071a]/70 to-[#05071a]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] via-transparent to-[#05071a]/60" />

      {/* 3D Pioneer */}
      <div className="pointer-events-none absolute right-[-8%] top-16 h-[46svh] w-[88%] opacity-40 sm:right-0 sm:top-16 sm:h-[56svh] sm:w-[72%] sm:opacity-55 lg:right-0 lg:top-16 lg:h-[88svh] lg:w-[58%] lg:opacity-90" aria-hidden>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pt-20 lg:justify-center lg:pb-8 lg:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 max-w-3xl text-xs font-medium text-aurora"
        >
          <a
            href="https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 uppercase tracking-[0.28em] hover:text-white"
          >
            <span className="h-px w-10 bg-aurora/60" /> A 2026 NASA Space Apps Challenge project ↗
          </a>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display title-glow max-w-4xl text-[2.8rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[5.2rem]"
        >
          Forgotten
          <br />
          <span className="shimmer-text">Space Explorers</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="font-display mt-2 text-lg tracking-[0.5em] text-white/45 sm:mt-3 sm:text-xl"
        >
          Stories of forgotten explorers
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-4 sm:text-base lg:mt-5 lg:text-lg"
        >
          Every machine has a story. Even when its mission ends, <em className="not-italic text-solar">its legacy continues.</em> Meet ten spacecraft, rovers
          and probes still resting, drifting or remembered across the Solar System.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pointer-events-auto mt-5 flex flex-wrap items-center gap-4 sm:mt-3"
        >
          <button
            onClick={() => go("solar-system")}
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[#05071a] shadow-[0_10px_50px_-10px_rgba(127,240,255,0.7)] transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Begin the journey <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-solar via-sakura to-aurora transition-transform duration-500 group-hover:translate-x-0" />
          </button>
          <Link
            to="/gallery"
            className="rounded-full border border-white/25 px-8 py-4 text-sm font-medium text-white/90 backdrop-blur transition-all hover:border-white/60 hover:bg-white/10"
          >
            Browse the gallery
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-4"
        >
          {[
            ["5", "destinations"],
            ["10", "machines"],
            ["1967–2022", "years of stories"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{n}</dt>
              <dd className="mt-1 text-xs tracking-wider text-white/45">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.4em] text-white/40 sm:flex">
        SCROLL
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}

function WhereAreThey() {
  const kinds = Object.keys(STATUS_META) as StatusKind[];
  return (
    <section className="relative py-28">
      <Container>
        <SectionHeading kicker="The premise" title={<>A museum without walls, <span className="text-white/50">scattered across the Solar System.</span></>}>
          Space exploration leaves things behind. Some sit in lunar dust, some lie under Martian skies, and some are still flying, silent, away from the Sun. Each
          one is told here the way it deserves: with real history, and with a voice.
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          {kinds.map((k, i) => {
            const m = STATUS_META[k];
            const items = equipment.filter((e) => e.status === k);
            return (
              <Reveal key={k} delay={i * 0.1}>
                <div className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: `0 30px 80px -50px ${m.color}` }}>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity group-hover:opacity-100" style={{ background: `${m.color}33`, opacity: 0.6 }} />
                  <p className="font-display text-6xl font-extrabold" style={{ color: m.color }}>{items.length}</p>
                  <h3 className="font-display mt-3 text-2xl font-bold text-white">{m.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{m.description}</p>
                  <ul className="mt-5 space-y-1.5 text-sm text-white/80">
                    {items.map((e) => (
                      <li key={e.id}>
                        <Link to={`/story/${e.id}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                          <span className="h-1 w-1 rounded-full" style={{ background: m.color }} /> {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Destinations() {
  const [active, setActive] = useState(0);
  return (
    <section id="destinations" className="relative py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading kicker="Five destinations" title="Choose a door.">
          Each world holds two machines. Start anywhere: the Moon, Venus, Mars, deep space or the asteroids.
        </SectionHeading>
        <div className="flex flex-col gap-3 lg:h-[36rem] lg:flex-row lg:gap-4">
          {destinations.map((d, i) => {
            const on = active === i;
            const eqs = d.equipmentIds.map((id) => getEquipment(id)!);
            return (
              <article
                key={d.id}
                onMouseEnter={() => setActive(i)}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 transition-[height,flex] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "h-[22rem] sm:h-[25rem] lg:h-full lg:flex-[3.4]" : "h-[4.75rem] sm:h-[5rem] lg:h-full lg:flex-1"}`}
              >
                <WatermarkedImage
                  src={d.image}
                  alt={`AI-generated anime-style illustration of ${d.name}`}
                  loading="lazy"
                  className="absolute inset-0"
                  imageClassName={`transition-transform duration-[1400ms] ${on ? "scale-100" : "scale-110"}`}
                />
                <div className={`absolute inset-0 transition-opacity duration-700 ${on ? "bg-gradient-to-t from-[#05071a] via-[#05071a]/30 to-transparent" : "bg-[#05071a]/55 lg:bg-[#05071a]/60"}`} />
                <button
                  type="button"
                  aria-label={`Show ${d.name} destination`}
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="absolute inset-0 z-10 cursor-pointer"
                />
                <span
                  aria-hidden
                  className={`font-display pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-xl font-bold transition-all duration-700 lg:hidden ${on ? "opacity-0" : "opacity-100"}`}
                  style={{ color: d.accent }}
                >
                  {d.name.replace("The ", "")}
                </span>
                {/* collapsed vertical label (desktop) */}
                <div aria-hidden className={`pointer-events-none absolute inset-0 z-20 hidden flex-col items-center justify-between py-8 transition-opacity duration-500 lg:flex ${on ? "opacity-0" : "opacity-100"}`}>
                  <span className="font-display text-4xl font-bold" style={{ color: d.accent }}>{d.name.replace("The ", "").charAt(0)}</span>
                  <span className="font-display text-lg text-white/80">{d.name.replace("The ", "")}</span>
                </div>
                <div aria-hidden={!on} className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 transition-all duration-700 sm:p-8 ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                  <p className="text-xs tracking-[0.3em]" style={{ color: d.accent }}>{d.name.toUpperCase()}</p>
                  <h3 className="font-display mt-1 text-2xl font-bold text-white sm:text-4xl">{d.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{d.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {eqs.map((e) => (
                      <span key={e.id} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
                        {e.name} · {e.years}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/destination/${d.id}`}
                    tabIndex={on ? 0 : -1}
                    className="pointer-events-auto mt-5 inline-flex items-center gap-2 text-sm font-medium text-white transition-all hover:gap-4"
                    style={{ color: d.accent }}
                  >
                    Enter {d.name.replace("The ", "")} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FactVsStory() {
  const sample = getEquipment("opportunity-rover")!.narration[0];
  return (
    <section className="relative py-28">
      <Container>
        <SectionHeading kicker="How to read this site" title={<>Two voices. <span className="text-white/50">Never confused.</span></>}>
          Every story page has a first-person narration, a dramatisation that lets the machine speak. Next to it, labelled in a different colour, are the verified
          facts it is based on.
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-sakura/30 bg-gradient-to-br from-sakura/15 to-transparent p-8">
              <p className="mb-4 inline-flex rounded-full border border-sakura/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-sakura">✦ Imagined voice</p>
              <p className="font-display text-xl leading-[1.9] text-white/90 sm:text-2xl">“{sample.text}”</p>
              <p className="mt-6 text-sm text-white/45">Creative first-person narration: emotions and wording are invented.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-aurora/30 bg-gradient-to-br from-aurora/10 to-transparent p-8">
              <p className="mb-4 inline-flex rounded-full border border-aurora/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-aurora">✓ Verified record</p>
              <p className="text-lg leading-relaxed text-white/85">{sample.basis}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/65">
                <li className="flex gap-3"><span className="text-aurora">●</span> Dates, numbers and outcomes come from NASA, JPL and mission-partner pages.</li>
                <li className="flex gap-3"><span className="text-aurora">●</span> Where something is uncertain (such as a probe’s condition after impact), we say so.</li>
                <li className="flex gap-3"><span className="text-aurora">●</span> Every story links to official references.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhereAreThey />
      <section id="solar-system" className="relative scroll-mt-16 py-28">
        <Container>
          <SectionHeading kicker="Interactive Solar System" title={<>Wander the <span className="shimmer-text">Solar System.</span></>}>
            Planets drift along their orbits. Hover to hold them still, then choose a glowing world to meet the machines that were left behind there.
          </SectionHeading>
          <SolarSystem />
        </Container>
      </section>
      <Destinations />
      <section id="gallery" className="relative scroll-mt-16 py-28">
        <Container>
          <SectionHeading kicker="Equipment gallery" title="Ten machines. Ten stories.">
            Filter by destination or by where each machine is today, or open any card to hear its story.
          </SectionHeading>
          <Gallery />
        </Container>
      </section>
      <FactVsStory />
      <section className="relative py-28">
        <Container className="text-center">
          <Reveal>
            <p className="font-display title-glow mx-auto max-w-4xl text-3xl font-bold leading-snug text-white sm:text-5xl">
              A machine’s mission may end. <span className="shimmer-text">What it taught us doesn’t.</span>
            </p>
            <Link
              to="/destination/moon"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-medium text-white transition-all hover:gap-5 hover:border-white/60 hover:bg-white/10"
            >
              Start with the Moon <span>→</span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
