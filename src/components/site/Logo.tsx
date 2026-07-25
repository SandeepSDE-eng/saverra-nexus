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
  // Since the user provided an exact image with text, we will just use the image.
  // We can use CSS filters to invert the color if variant is "light" (for dark backgrounds).
  const isLight = variant === "light";

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <img
        src="/logo.png"
        alt="SAVERRA Logo"
        className={cn(
          "w-auto h-16 md:h-20 object-contain",
          isLight && "invert brightness-0"
        )}
      />
    </div>
  );
}
