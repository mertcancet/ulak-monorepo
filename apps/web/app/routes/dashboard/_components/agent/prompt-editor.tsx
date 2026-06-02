import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { DEFAULT_PROMPT } from "./constants";
import { AI_MODELS } from "./quick-select/toolbar.data";

interface PromptEditorProps {
  name?: string;
  onNameChange?: (value: string) => void;
  phoneNumber?: string;
  onPhoneNumberChange?: (value: string) => void;
  model?: string;
  onModelChange?: (value: string) => void;
  voice?: string;
  onVoiceChange?: (value: string) => void;
  apiKey?: string;
  onApiKeyChange?: (value: string) => void;
  allowInterruptions?: boolean;
  onAllowInterruptionsChange?: (value: boolean) => void;
  greetPrompt?: string;
  onGreetPromptChange?: (value: string) => void;
  goodbyePrompt?: string;
  onGoodbyePromptChange?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const PromptEditor = ({
  name,
  onNameChange,
  phoneNumber,
  onPhoneNumberChange,
  model,
  onModelChange,
  voice,
  onVoiceChange,
  apiKey,
  onApiKeyChange,
  allowInterruptions,
  onAllowInterruptionsChange,
  greetPrompt,
  onGreetPromptChange,
  goodbyePrompt,
  onGoodbyePromptChange,
  value,
  onChange,
}: PromptEditorProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);

  return (
    <div className="bg-card border-border flex flex-1 flex-col overflow-hidden rounded-xl border shadow-sm">
      <div className="border-border bg-secondary/20 flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary h-4 w-1.5 rounded-full" />
          <h2 className="text-sm font-bold tracking-tight">
            Sistem Talimatları
          </h2>
        </div>
        <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
          Markdown desteklenir
        </span>
      </div>
      <div className="border-border border-b">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-3 text-left"
          onClick={() => setIsSettingsOpen(current => !current)}
        >
          <div>
            <p className="text-sm font-semibold">Agent Ayarları</p>
            <p className="text-muted-foreground text-xs">
              POST /agents body alanlarını buradan doldurun
            </p>
          </div>
          <ChevronDown
            className={`size-4 transition-transform ${
              isSettingsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isSettingsOpen && (
          <div className="grid gap-4 border-t border-border p-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="agent-name">Agent adı</Label>
              <Input
                id="agent-name"
                value={name ?? ""}
                onChange={event => onNameChange?.(event.target.value)}
                placeholder="Örn. satış_destek_agent"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="agent-phone-number">Telefon numarası</Label>
              <Input
                id="agent-phone-number"
                value={phoneNumber ?? ""}
                onChange={event => onPhoneNumberChange?.(event.target.value)}
                placeholder="Örn. +905551112233"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="agent-model">Model</Label>
              <Select
                id="agent-model"
                value={model ?? ""}
                onChange={event => onModelChange?.(event.target.value)}
              >
                <option value="">Model seçin</option>
                {AI_MODELS.map(aiModel => (
                  <option key={aiModel.id} value={aiModel.id}>
                    {aiModel.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="agent-voice">Ses</Label>
              <Input
                id="agent-voice"
                value={voice ?? ""}
                onChange={event => onVoiceChange?.(event.target.value)}
                placeholder="Örn. minimax-cimo"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="agent-api-key">API Key</Label>
              <Input
                id="agent-api-key"
                type="password"
                value={apiKey ?? ""}
                onChange={event => onApiKeyChange?.(event.target.value)}
                placeholder="Model API key"
              />
            </div>

            <div className="md:col-span-2 flex items-start justify-between gap-4 rounded-lg border border-border bg-secondary/10 p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Kesintilere izin ver</p>
                <p className="text-muted-foreground text-xs">
                  Agent konuşurken kullanıcının araya girmesine izin verir.
                </p>
              </div>
              <Switch
                checked={allowInterruptions ?? true}
                onCheckedChange={checked =>
                  onAllowInterruptionsChange?.(checked)
                }
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="agent-greet-prompt">Karşılama mesajı</Label>
              <Textarea
                id="agent-greet-prompt"
                rows={3}
                value={greetPrompt ?? ""}
                onChange={event => onGreetPromptChange?.(event.target.value)}
                placeholder="Görüşme başındaki mesaj"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="agent-goodbye-prompt">Kapanış mesajı</Label>
              <Textarea
                id="agent-goodbye-prompt"
                rows={3}
                value={goodbyePrompt ?? ""}
                onChange={event => onGoodbyePromptChange?.(event.target.value)}
                placeholder="Görüşme sonundaki mesaj"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <button
          type="button"
          className="border-border flex w-full items-center justify-between border-b px-4 py-3 text-left"
          onClick={() => setIsInstructionsOpen(current => !current)}
        >
          <div>
            <p className="text-sm font-semibold">Sistem Talimatları</p>
            <p className="text-muted-foreground text-xs">
              Agent instructions alanı
            </p>
          </div>
          <ChevronDown
            className={`size-4 transition-transform ${
              isInstructionsOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isInstructionsOpen && (
          <div className="flex flex-1 flex-col p-0">
            <Textarea
              className="text-foreground/80 scrollbar-thin flex-1 resize-none border-none bg-transparent p-6 text-sm leading-relaxed font-medium focus-visible:ring-0"
              placeholder="Agent talimatlarını buraya girin..."
              value={value ?? DEFAULT_PROMPT}
              onChange={event => onChange?.(event.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
