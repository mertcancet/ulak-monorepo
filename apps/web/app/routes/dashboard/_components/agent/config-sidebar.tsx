import { ChevronDown } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { CONFIG_SECTIONS } from "./constants";

interface ConfigSectionItemProps {
  // biome-ignore lint/suspicious/noExplicitAny: <>
  icon: any;
  label: string;
  active?: boolean;
}

const ConfigSectionItem = ({
  icon: Icon,
  label,
  active = false,
}: ConfigSectionItemProps) => (
  <button
    type="button"
    className={cn(
      "group hover:bg-secondary/50 flex w-full items-center justify-between p-4 transition-all duration-200",
      active
        ? "bg-secondary text-foreground"
        : "text-muted-foreground hover:text-foreground",
    )}
  >
    <div className="flex items-center space-x-3">
      <Icon
        className={cn(
          "h-5 w-5",
          active
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <ChevronDown className="text-muted-foreground/50 h-4 w-4" />
  </button>
);

export const ConfigSidebar = () => {
  return (
    <div className="bg-card border-border flex w-80 flex-col overflow-hidden rounded-xl border shadow-sm">
      <ScrollArea className="h-full">
        <div className="divide-border divide-y">
          {CONFIG_SECTIONS.map((section, index) => (
            <ConfigSectionItem
              key={section.label}
              icon={section.icon}
              label={section.label}
              // biome-ignore lint/complexity/noUselessTernary: Fix later
              active={index === 0 ? false : false} // Could be driven by state later
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
