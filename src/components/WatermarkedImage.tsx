import { motion, type MotionProps } from "framer-motion";
import { cn } from "../utils/cn";

type WatermarkedImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  compact?: boolean;
  loading?: "eager" | "lazy";
  position?: "top-right" | "bottom-right";
  imageMotionProps?: MotionProps;
};

export function WatermarkedImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  compact = false,
  loading,
  position = "top-right",
  imageMotionProps,
}: WatermarkedImageProps) {
  return (
    <div className={cn("pointer-events-none relative", className)}>
      <motion.img
        {...imageMotionProps}
        src={src}
        alt={alt}
        loading={loading}
        className={`block h-full w-full object-cover ${imageClassName}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-2 z-20 rounded-full border border-white/40 bg-[#05071a]/90 font-sans font-semibold tracking-wide text-white shadow-lg backdrop-blur ${
          position === "bottom-right" ? "bottom-3" : "top-2"
        } ${
          compact ? "px-1 py-0.5 text-[8px] leading-3" : "px-2 py-1 text-[9px] leading-3 sm:text-[10px]"
        }`}
      >
        AI-generated
      </span>
    </div>
  );
}
