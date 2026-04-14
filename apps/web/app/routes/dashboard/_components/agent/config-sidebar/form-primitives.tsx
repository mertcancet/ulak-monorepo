import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import type { SelectOption } from "./types";

interface FieldProps {
  label: string;
  children: ReactNode;
}

interface SmallSelectProps {
  value?: string;
  placeholder: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Field = ({ label, children }: FieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium">{label}</Label>
    {children}
  </div>
);

export const SmallSelect = ({
  value,
  placeholder,
  options,
  onValueChange,
}: SmallSelectProps) => (
  <div className="relative">
    <select
      className="border-input bg-background ring-offset-background focus:ring-ring placeholder:text-muted-foreground h-8 w-full appearance-none rounded-md border pr-8 pl-2 text-xs focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      value={value || ""}
      onChange={e => onValueChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2" />
  </div>
);

export const ToggleRow = ({
  label,
  checked,
  onCheckedChange,
}: ToggleRowProps) => (
  <div className="bg-muted/20 border-border/50 flex items-center justify-between rounded-md border px-3 py-2">
    <Label className="cursor-pointer text-xs">{label}</Label>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);
