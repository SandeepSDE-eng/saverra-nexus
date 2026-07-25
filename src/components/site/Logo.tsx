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
  iconClassName,
  textClassName,
  taglineClassName,
  showTagline = true,
  hideText = false,
  variant = "dark",
}: LogoProps) {
  const brandColor = variant === "light" ? "#ffffff" : "#023b6d";

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("flex flex-col items-center", iconClassName)}>
        <svg
          viewBox="0 0 100 150"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-14 md:w-12 md:h-16"
        >
          {/* Top half of S */}
          <path
            d="M 90,10 L 10,10 L 10,70 L 90,70"
            fill="none"
            stroke={brandColor}
            strokeWidth="10"
            strokeLinejoin="miter"
          />
          <path
            d="M 35,20 L 35,60"
            fill="none"
            stroke={brandColor}
            strokeWidth="10"
          />
          <path
            d="M 65,20 L 65,60"
            fill="none"
            stroke={brandColor}
            strokeWidth="10"
          />

          {/* Bottom half of S */}
          <path
            d="M 10,70 L 90,70 L 90,140 L 10,140"
            fill="none"
            stroke={brandColor}
            strokeWidth="10"
            strokeLinejoin="miter"
          />
          <path
            d="M 35,80 L 35,130"
            fill="none"
            stroke={brandColor}
            strokeWidth="10"
          />
          <path
            d="M 65,80 L 65,130"
            fill="none"
            stroke={brandColor}
            strokeWidth="10"
          />
        </svg>
      </div>
      {!hideText && (
        <>
          <div
            className={cn(
              "font-display font-medium tracking-[0.15em] mt-2",
              textClassName
            )}
            style={{ color: brandColor }}
          >
            SAVERRA
          </div>
          {showTagline && (
            <div
              className={cn(
                "text-[10px] md:text-xs tracking-wide mt-0.5 text-center font-medium",
                taglineClassName
              )}
              style={{ color: brandColor }}
            >
              A Real Estate Firm
            </div>
          )}
        </>
      )}
    </div>
  );
}
