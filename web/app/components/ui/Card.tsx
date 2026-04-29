"use client";

import { type HTMLAttributes, type ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHoverable?: boolean;
}

export function Card({
  children,
  isHoverable = true,
  className = "",
  ...props
}: CardProps) {
  const hoverClass = isHoverable
    ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
    : "";

  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white p-4 shadow-resting ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
