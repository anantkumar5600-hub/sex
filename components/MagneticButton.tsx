"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
  cursor = "point",
  target
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  cursor?: string;
  target?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.25, y: relY * 0.35 });
  };

  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-4 text-sm tracking-wide font-medium rounded-full transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-paper text-ink hover:bg-paper-dim"
      : "border border-ink-line text-paper hover:border-paper hover:bg-ink-raised";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      data-cursor={cursor}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
