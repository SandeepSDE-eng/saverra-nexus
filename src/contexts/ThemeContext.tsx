import React, { createContext, useContext, useEffect, useState } from "react";
import { THEMES, ThemePalette } from "../lib/themes";

interface ThemeContextType {
  activeTheme: ThemePalette;
  setTheme: (themeId: string) => void;
  themes: ThemePalette[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<ThemePalette>(THEMES[0]);

  useEffect(() => {
    // Load saved theme
    const savedThemeId = localStorage.getItem("saverra_theme");
    if (savedThemeId) {
      const found = THEMES.find((t) => t.id === savedThemeId);
      if (found) {
        setActiveTheme(found);
      }
    }
  }, []);

  useEffect(() => {
    // Apply CSS Variables globally
    const root = document.documentElement;
    root.style.setProperty("--navy-deep", activeTheme.primary);
    root.style.setProperty("--gold", activeTheme.accent);
    
    // Some tailwind classes might rely on raw hex values or other color variables.
    // If the site uses `bg-[color:var(--navy-deep)]` everywhere, this is all we need.
  }, [activeTheme]);

  const setTheme = (themeId: string) => {
    const found = THEMES.find((t) => t.id === themeId);
    if (found) {
      setActiveTheme(found);
      localStorage.setItem("saverra_theme", themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
