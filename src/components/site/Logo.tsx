import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  taglineClassName?: string;
  showTagline?: boolean;
  hideText?: boolean;
  variant?: "dark" | "light";
}

export function Logo({
  className,
  variant = "dark",
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <div
      className={cn("bg-no-repeat", className)}
      style={{
        backgroundImage: "url('/logo.png')",
        backgroundSize: "auto 145%",
        backgroundPosition: "center center",
        filter: isLight 
          ? "grayscale(100%) invert(100%) brightness(1000%) contrast(1000%)" 
          : "none",
        mixBlendMode: isLight ? "screen" : "multiply",
      }}
    />
  );
}
