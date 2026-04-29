import { type HTMLAttributes, type ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1 rounded-full font-medium";

  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    primary: "bg-primary-100 text-primary-700",
    secondary: "bg-secondary-100 text-secondary-700",
    accent: "bg-accent-100 text-accent-800",
    outline: "border border-neutral-300 text-neutral-600",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

// Score badge with stars (1-5 scale)
interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  // Convert score (0-1) to stars (0-5)
  const stars = Math.min(5, score * 5);
  const roundedStars = Math.round(stars * 100) / 100;

  let variant: BadgeProps["variant"] = "default";

  if (score >= 0.9) {
    variant = "accent"; // Gold for 4.5+ stars
  } else if (score >= 0.8) {
    variant = "secondary"; // Olive for 4.0+ stars
  } else if (score >= 0.7) {
    variant = "primary"; // Burgundy for 3.5+ stars
  }

  return (
    <Badge variant={variant} size="md">
      <span className="text-base leading-none">⭐</span>
      <span className="font-semibold">{roundedStars.toFixed(2)}</span>
    </Badge>
  );
}
