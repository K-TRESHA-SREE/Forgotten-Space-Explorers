import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Chapter } from "../data";

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  return (
    voices.find((v) => /Google UK English Male|Daniel|Aaron|Alex|Natural|Online/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase() === "en-gb") ??
    voices[0]
  );
}

export function Narrator({ chapters, name, accent = "#ff9fbf" }: { chapters: Chapter[]; name: string; accent?: string }) {
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [useTimer, setUseTimer] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  // reset when the story changes
  useEffect(() => {
    setPlaying(false);
    setIdx(0);
    setProgress(0);
    setUseTimer(false);
  }, [chapters]);

  useEffect(() => {
    if (!playing) return;
    let cancelled = false;
    const text = chapters[idx].text;
    const next = () => {
      if (cancelled) return;
      if (idx < chapters.length - 1) {
        setProgress(0);
        setIdx(idx + 1);
      } else {
        setPlaying(false);
        setIdx(0);
        setProgress(0);
      }
    };

    if (supported && !useTimer) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice();
      if (v) u.voice = v;
      u.lang = v?.lang ?? "en-US";
      u.rate = 0.93;
      u.pitch = 0.92;
      u.onboundary = (e) => {
        if (!cancelled) setProgress(Math.min(1, e.charIndex / text.length));
      };
      u.onend = next;
      u.onerror = () => {
        if (!cancelled) setUseTimer(true);
      };
      const t = window.setTimeout(() => synth.speak(u), 60);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
        synth.cancel();
      };
    }

    // reading-pace fallback when speech synthesis is unavailable
    const ms = Math.max(3500, (text.split(/\s+/).length / 2.6) * 1000);
    const start = performance.now();
    const iv = window.setInterval(() => setProgress(Math.min(1, (performance.now() - start) / ms)), 120);
    const to = window.setTimeout(next, ms);
    return () => {
      cancelled = true;
      window.clearInterval(iv);
      window.clearTimeout(to);
    };
  }, [playing, idx, chapters, supported, useTimer]);

  // always stop speaking when leaving
  useEffect(() => () => void (supported && window.speechSynthesis.cancel()), [supported]);

  const total = useMemo(() => (idx + progress) / chapters.length, [idx, progress, chapters.length]);
  const go = (i: number) => {
    setProgress(0);
    setIdx(Math.max(0, Math.min(chapters.length - 1, i)));
  };

  return (
    <section
      aria-label={`Narration: ${name} tells its story`}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-8"
      style={{ background: `linear-gradient(160deg, ${accent}1f, rgba(10,16,48,0.7) 55%)` }}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em]"
          style={{ borderColor: `${accent}77`, color: accent }}
        >
          ✦ Imagined voice · dramatisation
        </span>
        <div className="flex h-6 items-end gap-[3px]" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full"
              style={{
                background: accent,
                height: playing ? undefined : 4,
                animation: playing ? `wave ${0.6 + (i % 5) * 0.15}s ease-in-out ${i * 0.05}s infinite alternate` : undefined,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`@keyframes wave{from{height:4px}to{height:22px}}`}</style>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="min-h-[15rem]"
          aria-live="polite"
        >
          <p className="mb-2 text-xs tracking-[0.3em] text-white/40">
            CHAPTER {idx + 1} / {chapters.length}
          </p>
          <h3 className="font-display mb-4 text-2xl font-bold text-white sm:text-3xl">{chapters[idx].title}</h3>
          <p className="font-display text-lg leading-[1.9] text-white/90 sm:text-xl">
            <span className="mr-1 text-3xl leading-none" style={{ color: accent }}>“</span>
            {chapters[idx].text}
            <span className="ml-1 text-3xl leading-none" style={{ color: accent }}>”</span>
          </p>
          <div className="mt-5 rounded-2xl border border-aurora/25 bg-aurora/[0.06] p-4">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-aurora">✓ Based on the verified record</p>
            <p className="text-sm leading-relaxed text-white/70">{chapters[idx].basis}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* progress */}
      <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(total * 100)}>
        <div className="h-full rounded-full transition-[width] duration-200" style={{ width: `${total * 100}%`, background: `linear-gradient(90deg, ${accent}, #7ff0ff)` }} />
      </div>

      {/* controls */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            aria-label="Previous chapter"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/50 hover:bg-white/10 disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause narration" : "Play narration"}
            className="flex h-14 min-w-14 items-center justify-center gap-2 rounded-full px-6 text-[#05071a] shadow-lg transition hover:scale-105 active:scale-95"
            style={{ background: accent, boxShadow: `0 8px 30px -6px ${accent}aa` }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M7 4v16l13-8z" />}
            </svg>
            <span className="text-sm font-bold">{playing ? "Pause" : idx === 0 && progress === 0 ? "Listen" : "Resume"}</span>
          </button>
          <button
            onClick={() => go(idx + 1)}
            disabled={idx === chapters.length - 1}
            aria-label="Next chapter"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/50 hover:bg-white/10 disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
          </button>
        </div>
        <div className="flex gap-1.5" role="tablist" aria-label="Chapters">
          {chapters.map((c, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Chapter ${i + 1}: ${c.title}`}
              onClick={() => go(i)}
              className="h-2.5 rounded-full transition-all duration-300"
              style={{ width: i === idx ? 28 : 10, background: i === idx ? accent : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/40">
        {supported && !useTimer
          ? "Voice is generated by your browser. The words are an imagined first-person dramatisation; the boxed notes show the facts behind each chapter."
          : "Audio isn’t available in this browser, so the story will advance at reading pace. Words are an imagined dramatisation."}
      </p>
    </section>
  );
}
