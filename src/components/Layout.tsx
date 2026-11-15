import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { destinations } from "../data";

export function useGoToSection() {
  const navigate = useNavigate();
  const location = useLocation();
  return (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 450);
    } else scroll();
  };
}

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Forgotten Space Explorers — home">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <circle cx="17" cy="17" r="5" fill="#ffcf7a" />
        <ellipse cx="17" cy="17" rx="15" ry="6" stroke="#7ff0ff" strokeOpacity=".7" transform="rotate(-25 17 17)" />
        <circle cx="29" cy="11" r="2.2" fill="#ff9fbf" className="origin-center transition-transform duration-700 group-hover:translate-x-[-4px] group-hover:translate-y-[6px]" />
      </svg>
      <span className="leading-none">
        <span className="font-display block text-[1.05rem] font-bold tracking-wide text-white">Forgotten Space Explorers</span>
        <span className="block text-[0.65rem] tracking-[0.35em] text-white/50">Stories of forgotten explorers</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const go = useGoToSection();

  useEffect(() => {
    setOpen(false);
    setDd(false);
  }, [location.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm transition-colors ${isActive ? "text-white" : "text-white/65 hover:text-white"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-[#05071a]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          <button onClick={() => go("solar-system")} className="rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white">
            Solar System
          </button>
          <div className="relative" onMouseLeave={() => setDd(false)}>
            <button
              onClick={() => setDd((v) => !v)}
              onMouseEnter={() => setDd(true)}
              aria-expanded={dd}
              aria-haspopup="true"
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white"
            >
              Destinations <span className={`text-[10px] transition-transform ${dd ? "rotate-180" : ""}`}>▼</span>
            </button>
            <AnimatePresence>
              {dd && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="glass absolute left-0 top-full w-72 overflow-hidden rounded-2xl bg-[#0a1030]/95 p-2 shadow-2xl"
                >
                  {destinations.map((d) => (
                    <Link
                      key={d.id}
                      to={`/destination/${d.id}`}
                      className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                    >
                      <span className="font-display w-10 text-2xl" style={{ color: d.accent }} aria-hidden>
                        {d.name.replace("The ", "").charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-white">{d.name}</span>
                        <span className="block text-xs text-white/50">{d.tagline}</span>
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavLink to="/gallery" className={linkCls}>
            Gallery
          </NavLink>
          <NavLink to="/about" className={linkCls}>
            Facts &amp; Sources
          </NavLink>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-px w-5 bg-white transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-white transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
              <button onClick={() => { setOpen(false); go("solar-system"); }} className="rounded-xl px-4 py-3 text-left text-white/80 hover:bg-white/5">
                Solar System
              </button>
              {destinations.map((d) => (
                <Link key={d.id} to={`/destination/${d.id}`} className="flex items-center gap-4 rounded-xl px-4 py-3 text-white/80 hover:bg-white/5">
                  <span className="font-display w-10 text-xl" style={{ color: d.accent }} aria-hidden>{d.name.replace("The ", "").charAt(0)}</span>
                  {d.name}
                </Link>
              ))}
              <Link to="/gallery" className="rounded-xl px-4 py-3 text-white/80 hover:bg-white/5">Gallery</Link>
              <Link to="/about" className="rounded-xl px-4 py-3 text-white/80 hover:bg-white/5">Facts &amp; Sources</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/10 bg-[#04061a]/80 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
            Every machine has a story.
            <br />
            <span className="shimmer-text">Even when its mission ends, its legacy continues.</span>
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
            A storytelling project for the 2026 NASA Space Apps Challenge. Dates, numbers and outcomes come from NASA, JPL and
            mission-partner sources. First-person narration is always an imagined dramatisation.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs tracking-[0.3em] text-white/40">DESTINATIONS</h4>
          <ul className="space-y-2">
            {destinations.map((d) => (
              <li key={d.id}>
                <Link to={`/destination/${d.id}`} className="text-sm text-white/70 transition-colors hover:text-aurora">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs tracking-[0.3em] text-white/40">EXPLORE</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/gallery" className="hover:text-aurora">Equipment gallery</Link></li>
            <li><Link to="/about" className="hover:text-aurora">Facts, method &amp; sources</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-6 text-center text-xs leading-relaxed text-white/35 sm:px-8">
        An independent educational project. Not affiliated with or endorsed by NASA. AI-generated illustrations are visibly watermarked; NASA archival photos
        are not. 3D models are simplified artistic reconstructions, not official engineering models.
      </div>
    </footer>
  );
}
