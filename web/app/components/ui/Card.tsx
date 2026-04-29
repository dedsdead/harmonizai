"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.div
      whileHover={
        isHoverable
          ? {
              y: -2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
            }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-xl border border-neutral-200 bg-white p-4 shadow-resting ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
