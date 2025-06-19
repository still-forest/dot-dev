"use client";

import { useCallback, useEffect, useState } from "react";
import { THEMES, type Theme, ThemeProviderContext } from "@/context/ThemeProviderContext";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  defaultTheme = THEMES.LIGHT,
  storageKey = "still-forest-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize with defaultTheme for SSR safety
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // On mount, sync theme from localStorage if available
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme && Object.values(THEMES).includes(storedTheme)) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.warn("Unable to access localStorage:", error);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...Object.values(THEMES));

    if (theme === "system") {
      let systemTheme: Theme = THEMES.LIGHT;
      try {
        systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? THEMES.DARK : THEMES.LIGHT;
      } catch (error) {
        console.warn("Error checking system theme preference:", error);
      }
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);

    return () => {
      root.classList.remove(...Object.values(THEMES));
    };
  }, [theme]);

  const setThemeCallback = useCallback(
    (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        console.warn("Unable to access localStorage:", error);
      }
      setTheme(theme);
    },
    [storageKey],
  );

  const value = {
    theme,
    setTheme: setThemeCallback,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
