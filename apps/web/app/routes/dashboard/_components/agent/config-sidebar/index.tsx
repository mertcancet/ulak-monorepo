import { useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CONFIG_SECTIONS } from "../constants";
import { ConfigSectionItem } from "./config-section-item";
import type { FormState, FormValue } from "./types";

export const ConfigSidebar = () => {
  const [openSections, setOpenSections] = useState<string | null>(
    CONFIG_SECTIONS[0]?.label,
  );
  const [formData, setFormData] = useState<Record<string, FormState>>({});

  const toggleSection = (label: string) => {
    setOpenSections(openSections === label ? null : label);
  };

  const handleFormChange = (label: string, field: string, value: FormValue) => {
    setFormData(prev => ({
      ...prev,
      [label]: {
        ...prev[label],
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-card border-border flex w-80 flex-col overflow-hidden rounded-xl border shadow-sm">
      <ScrollArea className="h-full">
        <div className="divide-border divide-y">
          {CONFIG_SECTIONS.map(section => (
            <ConfigSectionItem
              key={section.label}
              icon={section.icon}
              label={section.label}
              isOpen={openSections === section.label}
              onToggle={() => toggleSection(section.label)}
              formData={formData[section.label] || {}}
              onFormChange={handleFormChange}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
