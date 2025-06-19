import ThemeProvider from "@/context/ThemeProvider";
import { Root } from "./app/[root]";
import { THEMES } from "./context/ThemeProviderContext";

export default function App() {
  return (
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="still-forest-theme">
      <Root />
    </ThemeProvider>
  );
}
