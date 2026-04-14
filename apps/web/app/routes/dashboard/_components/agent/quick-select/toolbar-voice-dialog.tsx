import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { LANGUAGES, VOICE_TONES, type VoiceTab } from "./toolbar.data";
import {
  CustomProviderTabs,
  CustomVoiceControls,
  PlatformVoiceControls,
} from "./toolbar-voice-controls";
import { filterVoices, getRecommendedVoices } from "./toolbar-voice-filters";
import { VoiceCards, VoiceTable } from "./toolbar-voice-results";

interface QuickSelectVoiceDialogProps {
  selectedVoiceId: string;
  setSelectedVoiceId: (voiceId: string) => void;
  selectedVoiceName: string;
  voiceTone: string;
  setVoiceTone: (tone: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (languageCode: string) => void;
  voiceTab: VoiceTab;
  setVoiceTab: (tab: VoiceTab) => void;
  voiceProvider: string;
  setVoiceProvider: (provider: string) => void;
  voiceGenderFilter: string;
  setVoiceGenderFilter: (value: string) => void;
  voiceAccentFilter: string;
  setVoiceAccentFilter: (value: string) => void;
  voiceTypeFilter: string;
  setVoiceTypeFilter: (value: string) => void;
  voiceSearch: string;
  setVoiceSearch: (value: string) => void;
}

export function QuickSelectVoiceDialog({
  selectedVoiceId,
  setSelectedVoiceId,
  selectedVoiceName,
  voiceTone,
  setVoiceTone,
  selectedLanguage,
  setSelectedLanguage,
  voiceTab,
  setVoiceTab,
  voiceProvider,
  setVoiceProvider,
  voiceGenderFilter,
  setVoiceGenderFilter,
  voiceAccentFilter,
  setVoiceAccentFilter,
  voiceTypeFilter,
  setVoiceTypeFilter,
  voiceSearch,
  setVoiceSearch,
}: QuickSelectVoiceDialogProps) {
  const filteredVoices = useMemo(() => {
    return filterVoices({
      voiceTab,
      voiceProvider,
      voiceGenderFilter,
      voiceAccentFilter,
      voiceTypeFilter,
      voiceSearch,
    });
  }, [
    voiceTab,
    voiceProvider,
    voiceGenderFilter,
    voiceAccentFilter,
    voiceTypeFilter,
    voiceSearch,
  ]);

  const recommendedVoices = useMemo(() => {
    return getRecommendedVoices(filteredVoices);
  }, [filteredVoices]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-background/50 border-border hover:bg-secondary h-8 gap-2"
        >
          <span className="text-xs font-semibold">
            {selectedVoiceName} ({voiceTone})
          </span>
          <ChevronDown className="text-muted-foreground h-3 w-3" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[88vh] overflow-hidden p-0 sm:max-w-6xl">
        <DialogHeader className="border-border border-b px-6 py-4">
          <DialogTitle>Ses Seçimi</DialogTitle>
          <DialogDescription>
            Ses sağlayıcısı, ton, dil ve model seçeneklerini yönetin.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={voiceTab}
          onValueChange={value => setVoiceTab(value as VoiceTab)}
          className="gap-0"
        >
          <div className="border-border border-b px-6 pt-3">
            <TabsList
              variant="line"
              className="h-auto gap-3 bg-transparent p-0"
            >
              <TabsTrigger
                value="platform"
                className="rounded-none px-0 pb-2 text-sm data-[state=active]:bg-transparent"
              >
                Platform Sesleri
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="rounded-none px-0 pb-2 text-sm data-[state=active]:bg-transparent"
              >
                Özel Sağlayıcılar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="platform" className="space-y-4 px-6 py-4">
            <PlatformVoiceControls
              voiceGenderFilter={voiceGenderFilter}
              setVoiceGenderFilter={setVoiceGenderFilter}
              voiceAccentFilter={voiceAccentFilter}
              setVoiceAccentFilter={setVoiceAccentFilter}
              voiceSearch={voiceSearch}
              setVoiceSearch={setVoiceSearch}
            />
            <VoiceCards
              recommendedVoices={recommendedVoices}
              selectedVoiceId={selectedVoiceId}
              onSelectVoice={setSelectedVoiceId}
            />
            <VoiceTable
              voices={filteredVoices}
              selectedVoiceId={selectedVoiceId}
              onSelectVoice={setSelectedVoiceId}
            />
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 px-6 py-4">
            <CustomProviderTabs
              voiceProvider={voiceProvider}
              setVoiceProvider={setVoiceProvider}
            />
            <CustomVoiceControls
              voiceGenderFilter={voiceGenderFilter}
              setVoiceGenderFilter={setVoiceGenderFilter}
              voiceAccentFilter={voiceAccentFilter}
              setVoiceAccentFilter={setVoiceAccentFilter}
              voiceTypeFilter={voiceTypeFilter}
              setVoiceTypeFilter={setVoiceTypeFilter}
              voiceSearch={voiceSearch}
              setVoiceSearch={setVoiceSearch}
            />
            <VoiceCards
              recommendedVoices={recommendedVoices}
              selectedVoiceId={selectedVoiceId}
              onSelectVoice={setSelectedVoiceId}
            />
            <VoiceTable
              voices={filteredVoices}
              selectedVoiceId={selectedVoiceId}
              onSelectVoice={setSelectedVoiceId}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-border border-t px-6 py-4 sm:justify-between">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <select
              value={voiceTone}
              onChange={event => setVoiceTone(event.target.value)}
              className="bg-background border-border h-10 rounded-lg border px-3 text-sm outline-none"
            >
              {VOICE_TONES.map(tone => (
                <option key={tone} value={tone}>
                  Ton: {tone}
                </option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={event => setSelectedLanguage(event.target.value)}
              className="bg-background border-border h-10 rounded-lg border px-3 text-sm outline-none"
            >
              {LANGUAGES.map(language => (
                <option key={language.code} value={language.code}>
                  Dil: {language.label}
                </option>
              ))}
            </select>
          </div>

          <Button type="button">Ses Profilini Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
