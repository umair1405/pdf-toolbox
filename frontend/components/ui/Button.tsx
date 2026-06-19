"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import { useMagneticButton } from "@/hooks/useMagneticButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
  magnetic?: boolean;
}

export function Button({
  href,
  variant = "primary",
  size = "default",
  magnetic = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const magneticRef = useMagneticButton<HTMLAnchorElement & HTMLButtonElement>(0.25);

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-shadow duration-300",
    size === "default" ? "px-6 py-3 text-[14.5px]" : "px-4.5 py-2 text-[13px]",
    variant === "primary"
      ? "bg-grad-warm text-white shadow-[0_8px_30px_-8px_rgba(255,77,77,0.55)] hover:shadow-[0_12px_38px_-6px_rgba(255,77,77,0.75)]"
      : "bg-white/[0.045] border border-white/[0.09] text-white hover:bg-white/[0.08]",
    className
  );

  if (href) {
    return (
      <Link href={href} ref={magnetic ? magneticRef : undefined} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={magnetic ? magneticRef : undefined} className={classes} {...props}>
      {children}
    </button>
  );
}
