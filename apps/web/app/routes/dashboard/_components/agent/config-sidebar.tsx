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
      "w-full flex items-center justify-between p-4 transition-all duration-200 group hover:bg-secondary/50",
      active
        ? "bg-secondary text-foreground"
        : "text-muted-foreground hover:text-foreground",
    )}
  >
    <div className="flex items-center space-x-3">
      <Icon
        className={cn(
          "w-5 h-5",
          active
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
  </button>
);

export const ConfigSidebar = () => {
  return (
    <div className="w-80 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden glass">
      <ScrollArea className="h-full">
        <div className="divide-y divide-border">
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
