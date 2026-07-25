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
      className={cn(
        "bg-no-repeat",
        isLight 
          ? "grayscale invert brightness-[5] contrast-[5] mix-blend-screen" 
          : "mix-blend-multiply",
        className
      )}
      style={{
        backgroundImage: "url('/logo.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    />
  );
}
