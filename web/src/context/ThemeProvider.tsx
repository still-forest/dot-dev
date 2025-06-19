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
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    } catch (error) {
      console.warn("Unable to access localStorage:", error);
      return defaultTheme;
    }
  });

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
      console.log("setting theme", theme);
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
