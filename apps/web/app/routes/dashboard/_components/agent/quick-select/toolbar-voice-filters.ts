import { VOICE_OPTIONS, type VoiceOption } from "./toolbar.data";

interface FilterVoicesInput {
  voiceTab: "platform" | "custom";
  voiceProvider: string;
  voiceGenderFilter: string;
  voiceAccentFilter: string;
  voiceTypeFilter: string;
  voiceSearch: string;
}

export function filterVoices({
  voiceTab,
  voiceProvider,
  voiceGenderFilter,
  voiceAccentFilter,
  voiceTypeFilter,
  voiceSearch,
}: FilterVoicesInput): VoiceOption[] {
  return VOICE_OPTIONS.filter(voice => {
    if (voice.category !== voiceTab) {
      return false;
    }
    if (voiceTab === "custom" && voice.provider !== voiceProvider) {
      return false;
    }
    if (voiceGenderFilter !== "Tümü" && voice.gender !== voiceGenderFilter) {
      return false;
    }
    if (voiceAccentFilter !== "Tümü" && voice.accent !== voiceAccentFilter) {
      return false;
    }
    if (voiceTypeFilter !== "Tümü" && voice.type !== voiceTypeFilter) {
      return false;
    }
    if (!voiceSearch.trim()) {
      return true;
    }

    const searchTerm = voiceSearch.toLowerCase();
    return (
      voice.name.toLowerCase().includes(searchTerm) ||
      voice.id.toLowerCase().includes(searchTerm) ||
      voice.provider.toLowerCase().includes(searchTerm)
    );
  });
}

export function getRecommendedVoices(voices: VoiceOption[]): VoiceOption[] {
  return voices.filter(voice => voice.recommended).slice(0, 5);
}
