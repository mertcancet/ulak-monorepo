import { Brain, Languages, Mic2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AI_MODELS,
  LANGUAGES,
  VOICE_OPTIONS,
  type VoiceTab,
} from "./toolbar.data";
import { QuickSelectLanguageMenu } from "./toolbar-language-menu";
import { QuickSelectModelDialog } from "./toolbar-model-dialog";
import { QuickSelectVoiceDialog } from "./toolbar-voice-dialog";

export const QuickSelectToolbar = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>("gpt-4.1");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("tr");
  const [voiceTab, setVoiceTab] = useState<VoiceTab>("platform");
  const [voiceProvider, setVoiceProvider] = useState<string>("MiniMax");
  const [voiceGenderFilter, setVoiceGenderFilter] = useState<string>("Tümü");
  const [voiceAccentFilter, setVoiceAccentFilter] = useState<string>("Tümü");
  const [voiceTypeFilter, setVoiceTypeFilter] = useState<string>("Tümü");
  const [voiceSearch, setVoiceSearch] = useState<string>("");
  const [selectedVoiceId, setSelectedVoiceId] =
    useState<string>("minimax-cimo");
  const [voiceTone, setVoiceTone] = useState<string>("Doğal");

  const selectedModelName = useMemo<string>(() => {
    return (
      AI_MODELS.find(model => model.id === selectedModelId)?.name ?? "Model Seç"
    );
  }, [selectedModelId]);

  const selectedVoiceName = useMemo<string>(() => {
    return (
      VOICE_OPTIONS.find(voice => voice.id === selectedVoiceId)?.name ?? "Caner"
    );
  }, [selectedVoiceId]);

  const selectedLanguageLabel = useMemo<string>(() => {
    return (
      LANGUAGES.find(language => language.code === selectedLanguage)?.label ??
      "Türkçe"
    );
  }, [selectedLanguage]);

  return (
    <div className="border-border flex items-center space-x-3 rounded-xl border p-2 shadow-sm backdrop-blur-sm">
      <div className="text-primary flex items-center gap-2">
        <Brain className="h-3.5 w-3.5" />
        <QuickSelectModelDialog
          models={AI_MODELS}
          selectedModelId={selectedModelId}
          selectedModelName={selectedModelName}
          onSelectModel={setSelectedModelId}
        />
      </div>

      <div className="text-primary flex items-center gap-2">
        <Mic2 className="h-3.5 w-3.5" />
        <QuickSelectVoiceDialog
          selectedVoiceId={selectedVoiceId}
          setSelectedVoiceId={setSelectedVoiceId}
          selectedVoiceName={selectedVoiceName}
          voiceTone={voiceTone}
          setVoiceTone={setVoiceTone}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          voiceTab={voiceTab}
          setVoiceTab={setVoiceTab}
          voiceProvider={voiceProvider}
          setVoiceProvider={setVoiceProvider}
          voiceGenderFilter={voiceGenderFilter}
          setVoiceGenderFilter={setVoiceGenderFilter}
          voiceAccentFilter={voiceAccentFilter}
          setVoiceAccentFilter={setVoiceAccentFilter}
          voiceTypeFilter={voiceTypeFilter}
          setVoiceTypeFilter={setVoiceTypeFilter}
          voiceSearch={voiceSearch}
          setVoiceSearch={setVoiceSearch}
        />
      </div>

      <div className="text-primary ml-auto flex items-center gap-2">
        <Languages className="h-3.5 w-3.5" />
        <QuickSelectLanguageMenu
          languages={LANGUAGES}
          selectedLanguage={selectedLanguage}
          selectedLanguageLabel={selectedLanguageLabel}
          onSelectLanguage={setSelectedLanguage}
        />
      </div>
    </div>
  );
};
