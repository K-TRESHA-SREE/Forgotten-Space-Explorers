import { Link } from "react-router-dom";
import { equipment, STATUS_META, type StatusKind } from "../data";
import { Container, Reveal, SectionHeading } from "../components/ui";

const TECH = [
  ["React + Vite", "Fast, component-based single-page app that builds into one self-contained file for easy deployment."],
  ["Three.js / React Three Fiber", "Real-time, interactive 3D models that you can rotate and zoom, built in code so they load instantly and work offline."],
  ["Framer Motion", "Smooth page transitions, scroll reveals and microinteractions, which respect the ‘reduce motion’ setting."],
  ["Web Speech API", "Free, built-in browser text-to-speech powers the narration with play, pause and chapter controls."],
  ["Tailwind CSS", "Responsive design from phones to wide screens."],
  ["AI-assisted illustration", "The anime-style artwork was generated with an AI image tool and compressed for fast loading. It is interpretive art, not photography."],
];

const UNCERTAIN = [
  "The ascent stage of Apollo 11’s Eagle is believed to have crashed on the Moon, but its exact location is unknown.",
  "The condition of the Pioneer Venus Large Probe after impact is unknown. NASA only reports that its transmissions ended at impact.",
  "Narrations are dramatisations. Only the ‘Based on the verified record’ boxes and the Mission File are statements of fact.",
  "The 3D models are simplified reconstructions made for this site, not official NASA engineering models.",
];

export default function About() {
  return (
    <div className="pt-36">
      <Container>
        <SectionHeading kicker="Facts, method & sources" title={<>How we kept it <span className="shimmer-text">honest.</span></>}>
          This project mixes emotion and evidence on purpose, but never lets one pretend to be the other.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-sakura/30 bg-gradient-to-br from-sakura/15 to-transparent p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-sakura">✦ Imagined voice</p>
              <h3 className="font-display text-2xl font-bold text-white">Creative narration</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                Each machine “speaks” in the first person. Feelings, metaphors and wording are invented to help you connect with the story. Every chapter is clearly
                labelled as a dramatisation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-aurora/30 bg-gradient-to-br from-aurora/10 to-transparent p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-aurora">✓ Verified record</p>
              <h3 className="font-display text-2xl font-bold text-white">Mission files &amp; timelines</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                Dates, figures, locations and outcomes were checked against NASA Science, NASA’s NSSDC catalogue, NASA History and mission-partner pages (such as the
                Johns Hopkins Applied Physics Laboratory). Each narration chapter also shows the facts it rests on.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <SectionHeading kicker="Where are they now?" title="Three very different endings." />
          <div className="grid gap-5 md:grid-cols-3">
            {(Object.keys(STATUS_META) as StatusKind[]).map((k, i) => {
              const m = STATUS_META[k];
              return (
                <Reveal key={k} delay={i * 0.08}>
                  <div className="glass h-full rounded-3xl p-7" style={{ borderColor: `${m.color}44` }}>
                    <p className="font-display text-xl font-bold" style={{ color: m.color }}>{m.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{m.description}</p>
                    <ul className="mt-4 space-y-1 text-sm">
                      {equipment.filter((e) => e.status === k).map((e) => (
                        <li key={e.id}>
                          <Link className="text-white/80 hover:text-white" to={`/story/${e.id}`}>→ {e.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading kicker="Be careful" title="Known uncertainties." />
            <ul className="space-y-4">
              {UNCERTAIN.map((u) => (
                <Reveal key={u}>
                  <li className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 leading-relaxed text-white/75">
                    <span className="text-solar">◆</span>
                    {u}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading kicker="Under the hood" title="Tools we chose." />
            <dl className="space-y-4">
              {TECH.map(([t, d]) => (
                <Reveal key={t}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <dt className="font-display text-lg font-bold text-white">{t}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-white/60">{d}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              Accessibility: full keyboard navigation, visible focus states, text for every narration, reduced-motion support and descriptive labels on interactive 3D views.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading kicker="All references" title="Every source, in one place." />
          <div className="grid gap-6 md:grid-cols-2">
            {equipment.map((e) => (
              <Reveal key={e.id}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <Link to={`/story/${e.id}`} className="font-display text-xl font-bold text-white hover:text-aurora">{e.name}</Link>
                  <ul className="mt-3 space-y-2 text-sm">
                    {e.references.map((r) => (
                      <li key={r.url}>
                        <a href={r.url} target="_blank" rel="noreferrer noopener" className="text-white/65 underline-offset-4 hover:text-aurora hover:underline">
                          {r.label} <span className="text-white/30">· {r.source} ↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
