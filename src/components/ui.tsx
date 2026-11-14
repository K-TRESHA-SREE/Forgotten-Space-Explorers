import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  children,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`relative mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-aurora">{kicker}</p>
      <h2 className="font-display title-glow text-4xl font-bold leading-[1.15] text-white sm:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">{children}</p>}
    </Reveal>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
