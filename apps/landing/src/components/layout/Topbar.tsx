import { Search, Bell, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useTranslations } from "@/i18n";

interface TopbarProps {
  title?: string;
  description?: string;
}

export function Topbar({ title = "Dashboard", description }: TopbarProps) {
  const [isDark, setIsDark] = useState(false);
  const t = useTranslations();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur-sm">
      {/* Page title */}
      <div className="flex flex-col">
        <h1 className="text-base font-semibold leading-none text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Search + Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="topbar-search"
            placeholder={t("topbar.searchPlaceholder")}
            className="h-8 w-56 border-transparent bg-muted/50 pl-9 text-xs focus-visible:border-input focus-visible:bg-background"
          />
        </div>

        {/* Theme toggle */}
        <Button
          id="theme-toggle"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button
          id="notifications-btn"
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        {/* Primary action */}
        <Button id="new-call-btn" size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          {t("topbar.newCall")}
        </Button>

        {/* Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary/30">
          <AvatarFallback className="gradient-primary text-xs font-semibold text-white">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
