import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { renderFormContent } from "./render-form-content";
import type { ConfigSectionItemProps } from "./types";

export const ConfigSectionItem = ({
  icon: Icon,
  label,
  isOpen,
  onToggle,
  formData,
  onFormChange,
}: ConfigSectionItemProps) => (
  <div>
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group hover:bg-secondary/50 flex w-full items-center justify-between p-4 transition-all duration-200",
        isOpen
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <div className="flex items-center space-x-3">
        <Icon
          className={cn(
            "h-5 w-5",
            isOpen
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronDown
        className={cn(
          "text-muted-foreground/50 h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </button>
    {isOpen && (
      <div className="animate-in fade-in bg-card/50 border-border border-t p-4 duration-200">
        {renderFormContent(label, formData, (field, value) =>
          onFormChange(label, field, value),
        )}
      </div>
    )}
  </div>
);
