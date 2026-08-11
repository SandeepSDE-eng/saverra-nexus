import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center shrink-0", className)}>
      <img
        src="/logo.png"
        alt="SAVERRA REALTY"
        className="h-full w-auto object-contain max-h-full drop-shadow-md"
        onError={(e) => {
          // Fallback if logo.png image is missing
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
