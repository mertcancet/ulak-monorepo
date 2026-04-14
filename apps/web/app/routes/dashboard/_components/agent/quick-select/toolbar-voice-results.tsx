import { Check, Play } from "lucide-react";
import type { VoiceOption } from "./toolbar.data";

interface VoiceCardsProps {
  recommendedVoices: VoiceOption[];
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
}

export function VoiceCards({
  recommendedVoices,
  selectedVoiceId,
  onSelectVoice,
}: VoiceCardsProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Önerilen Sesler</p>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-5">
        {recommendedVoices.map(voice => {
          const isSelected = selectedVoiceId === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              onClick={() => onSelectVoice(voice.id)}
              className={`border-border hover:bg-secondary/40 flex items-start justify-between rounded-xl border p-3 text-left ${
                isSelected ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div>
                <p className="text-sm font-semibold">{voice.name}</p>
                <p className="text-muted-foreground text-xs">
                  {voice.accent} · {voice.ageGroup} · {voice.type}
                </p>
                <p className="text-muted-foreground text-xs">ID: {voice.id}</p>
              </div>
              {isSelected ? (
                <Check className="text-primary h-4 w-4" />
              ) : (
                <Play className="text-muted-foreground h-4 w-4" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface VoiceTableProps {
  voices: VoiceOption[];
  selectedVoiceId: string;
  onSelectVoice: (voiceId: string) => void;
}

export function VoiceTable({
  voices,
  selectedVoiceId,
  onSelectVoice,
}: VoiceTableProps) {
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="bg-secondary/40 text-muted-foreground grid grid-cols-[2fr_2fr_1.5fr_auto] px-4 py-2 text-xs font-semibold">
        <span>Ses</span>
        <span>Özellik</span>
        <span>Ses ID</span>
        <span className="sr-only">Seç</span>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {voices.map(voice => {
          const isSelected = selectedVoiceId === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              onClick={() => onSelectVoice(voice.id)}
              className="border-border hover:bg-secondary/30 grid w-full grid-cols-[2fr_2fr_1.5fr_auto] items-center border-t px-4 py-2 text-left text-sm"
            >
              <span className="font-medium">{voice.name}</span>
              <span className="text-muted-foreground text-xs">
                {voice.accent} · {voice.ageGroup} · {voice.type}
              </span>
              <span className="text-muted-foreground text-xs">{voice.id}</span>
              {isSelected ? (
                <Check className="text-primary h-4 w-4" />
              ) : (
                <Play className="text-muted-foreground h-4 w-4" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
