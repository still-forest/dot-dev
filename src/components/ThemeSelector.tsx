"use client";

import { ThemeSelector as BaseThemeSelector, type Theme } from "@still-forest/canopy";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <BaseThemeSelector setTheme={setTheme} theme={theme as Theme} />;
};
