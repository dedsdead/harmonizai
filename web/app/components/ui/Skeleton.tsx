interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "wine-card";
  width?: string;
  height?: string;
  animate?: boolean;
}

export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseStyles = "bg-neutral-200 relative overflow-hidden";
  const shimmerStyles = animate
    ? "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/75 after:to-transparent after:animate-shimmer"
    : "";

  const variants = {
    text: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    "wine-card": "rounded-lg",
  };

  const dimensions =
    variant === "wine-card"
      ? { width: "108px", height: "144px" }
      : { width: width || "100%", height: height || "1rem" };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${shimmerStyles} ${className}`}
      style={dimensions}
      aria-hidden="true"
    />
  );
}

// Wine card skeleton with gradient
export function WineCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-resting">
      {/* Image placeholder */}
      <div className="relative h-[144px] w-[108px] shrink-0 overflow-hidden rounded-lg bg-neutral-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-primary-200/40" />
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        {/* Bottle silhouette */}
        <svg
          viewBox="0 0 40 100"
          className="absolute inset-0 m-auto h-[80%] w-auto text-neutral-300"
          fill="currentColor"
        >
          <path d="M17 4 h6 v14 q0 3 2 6 q5 7 5 18 v52 q0 4 -4 4 h-12 q-4 0 -4 -4 v-52 q0 -11 5 -18 q2 -3 2 -6 z" />
        </svg>
      </div>

      {/* Content placeholders */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-5 w-[70%] rounded-md bg-neutral-200" />
        <div className="h-4 w-[45%] rounded-md bg-neutral-200" />
        <div className="h-3 w-[55%] rounded-md bg-neutral-200" />
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="h-3 w-full rounded-md bg-neutral-200" />
          <div className="h-3 w-[80%] rounded-md bg-neutral-200" />
        </div>
        <div className="mt-auto h-6 w-24 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}
