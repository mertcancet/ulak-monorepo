import type { LucideIcon } from "lucide-react";

export type FormValue = string | boolean;

export interface FormState {
  [key: string]: FormValue;
}

export interface ConfigSectionItemProps {
  icon: LucideIcon;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  formData: FormState;
  onFormChange: (label: string, field: string, value: FormValue) => void;
}

export interface SelectOption {
  value: string;
  label: string;
}
