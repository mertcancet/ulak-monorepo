import { Moon, Sun } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Aydinlik tema" : "Koyu tema"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

const DashboardHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header className="z-50 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-6">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        {children}
      </div>
      <ThemeToggle />
    </header>
  );
};

export default DashboardHeader;
