import { Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  ACCENT_FILTERS,
  GENDER_FILTERS,
  TYPE_FILTERS,
  VOICE_PROVIDERS,
} from "./toolbar.data";

interface NativeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  defaultLabel: string;
}

function NativeSelect({
  value,
  onChange,
  options,
  defaultLabel,
}: NativeSelectProps) {
  return (
    <select
      value={value}
      onChange={event => onChange(event.target.value)}
      className="bg-background border-border h-10 rounded-lg border px-3 text-sm outline-none"
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option === "Tümü" ? defaultLabel : option}
        </option>
      ))}
    </select>
  );
}

interface VoiceSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function VoiceSearchInput({ value, onChange }: VoiceSearchInputProps) {
  return (
    <div className="bg-background border-border flex h-10 items-center gap-2 rounded-lg border px-3">
      <Search className="text-muted-foreground h-4 w-4" />
      <input
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder="Ara..."
        className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
}

interface PlatformVoiceControlsProps {
  voiceGenderFilter: string;
  setVoiceGenderFilter: (value: string) => void;
  voiceAccentFilter: string;
  setVoiceAccentFilter: (value: string) => void;
  voiceSearch: string;
  setVoiceSearch: (value: string) => void;
}

export function PlatformVoiceControls({
  voiceGenderFilter,
  setVoiceGenderFilter,
  voiceAccentFilter,
  setVoiceAccentFilter,
  voiceSearch,
  setVoiceSearch,
}: PlatformVoiceControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-[auto_160px_160px_1fr]">
      <Button
        type="button"
        variant="outline"
        className="h-10 justify-start gap-2"
      >
        <Plus className="h-4 w-4" />
        Ses klonu ekle
      </Button>
      <NativeSelect
        value={voiceGenderFilter}
        onChange={setVoiceGenderFilter}
        options={GENDER_FILTERS}
        defaultLabel="Cinsiyet"
      />
      <NativeSelect
        value={voiceAccentFilter}
        onChange={setVoiceAccentFilter}
        options={ACCENT_FILTERS}
        defaultLabel="Aksan"
      />
      <VoiceSearchInput value={voiceSearch} onChange={setVoiceSearch} />
    </div>
  );
}

interface CustomProviderTabsProps {
  voiceProvider: string;
  setVoiceProvider: (provider: string) => void;
}

export function CustomProviderTabs({
  voiceProvider,
  setVoiceProvider,
}: CustomProviderTabsProps) {
  return (
    <div className="bg-secondary/40 flex flex-wrap items-center rounded-lg p-1">
      {VOICE_PROVIDERS.map(provider => (
        <button
          key={provider}
          type="button"
          onClick={() => setVoiceProvider(provider)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            voiceProvider === provider
              ? "bg-background text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {provider}
        </button>
      ))}
    </div>
  );
}

interface CustomVoiceControlsProps {
  voiceGenderFilter: string;
  setVoiceGenderFilter: (value: string) => void;
  voiceAccentFilter: string;
  setVoiceAccentFilter: (value: string) => void;
  voiceTypeFilter: string;
  setVoiceTypeFilter: (value: string) => void;
  voiceSearch: string;
  setVoiceSearch: (value: string) => void;
}

export function CustomVoiceControls({
  voiceGenderFilter,
  setVoiceGenderFilter,
  voiceAccentFilter,
  setVoiceAccentFilter,
  voiceTypeFilter,
  setVoiceTypeFilter,
  voiceSearch,
  setVoiceSearch,
}: CustomVoiceControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-[auto_160px_160px_160px_1fr]">
      <Button
        type="button"
        variant="outline"
        className="h-10 justify-start gap-2"
      >
        <Plus className="h-4 w-4" />
        Özel ses ekle
      </Button>
      <NativeSelect
        value={voiceGenderFilter}
        onChange={setVoiceGenderFilter}
        options={GENDER_FILTERS}
        defaultLabel="Cinsiyet"
      />
      <NativeSelect
        value={voiceAccentFilter}
        onChange={setVoiceAccentFilter}
        options={ACCENT_FILTERS}
        defaultLabel="Aksan"
      />
      <NativeSelect
        value={voiceTypeFilter}
        onChange={setVoiceTypeFilter}
        options={TYPE_FILTERS}
        defaultLabel="Tür"
      />
      <VoiceSearchInput value={voiceSearch} onChange={setVoiceSearch} />
    </div>
  );
}
