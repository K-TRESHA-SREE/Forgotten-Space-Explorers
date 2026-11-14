import { STATUS_META, type StatusKind } from "../data";

export function StatusBadge({ status, compact = false }: { status: StatusKind; compact?: boolean }) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur"
      style={{ borderColor: `${m.color}66`, color: m.color, background: `${m.color}14` }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: m.color }} />
        <span className="relative h-2 w-2 rounded-full" style={{ background: m.color }} />
      </span>
      {compact ? m.short : m.label}
    </span>
  );
}
