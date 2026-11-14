import { Link } from "react-router-dom";
import { equipment, getDestination, STATUS_META } from "../data";
import { Container, Reveal, SectionHeading } from "../components/ui";
import { Gallery } from "../components/Gallery";

export default function GalleryPage() {
  const chrono = [...equipment].sort((a, b) => a.yearStart - b.yearStart);
  return (
    <div className="pt-36">
      <Container>
        <SectionHeading kicker="Equipment gallery" title={<>Ten machines, <span className="shimmer-text">one legacy.</span></>}>
          Browse everything left behind. Filter by destination, by where it is now, or open any card to hear its story.
        </SectionHeading>
        <Gallery />

        <div className="mt-28">
          <SectionHeading kicker="Chronology" title="Fifty-five years of leaving things behind.">
            From Surveyor 3 in 1967 to DART in 2022: when each machine began its journey.
          </SectionHeading>
          <Reveal>
            <ol className="relative ml-3 space-y-2 border-l border-white/15 pl-8">
              {chrono.map((e) => {
                const d = getDestination(e.destination)!;
                const m = STATUS_META[e.status];
                return (
                  <li key={e.id} className="relative">
                    <span className="absolute -left-[2.58rem] top-5 h-3 w-3 rounded-full border-2 border-[#05071a]" style={{ background: m.color, boxShadow: `0 0 12px ${m.color}` }} />
                    <Link to={`/story/${e.id}`} className="group flex flex-wrap items-center gap-x-6 gap-y-1 rounded-2xl px-4 py-3 transition hover:bg-white/[0.06]">
                      <span className="font-display w-24 text-xl font-bold text-white/90">{e.yearStart}</span>
                      <span className="min-w-[10rem] flex-1 font-medium text-white group-hover:text-aurora">{e.name}</span>
                      <span className="text-sm" style={{ color: d.accent }}>{d.name}</span>
                      <span className="text-xs text-white/45">{m.short}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
