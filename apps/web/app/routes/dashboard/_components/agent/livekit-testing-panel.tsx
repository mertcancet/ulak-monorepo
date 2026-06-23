import {
  RoomAudioRenderer,
  useAgent,
  useLocalParticipant,
  useSessionContext,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState } from "react";
import { AgentAudioVisualizerWave } from "~/components/agents-ui/agent-audio-visualizer-wave";
import { AgentTrackControl } from "~/components/agents-ui/agent-track-control";
import { Button } from "~/components/ui/button";

export const LivekitTestingPanel = ({ agentId }: { agentId?: string }) => {
  const [connected, setConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [_status, setStatus] = useState("");
  const session = useSessionContext();
  const _room = session.room;

  const { microphoneTrack } = useAgent();
  const { localParticipant } = useLocalParticipant();

  const _localAudioTrack = Array.from(
    localParticipant.audioTrackPublications.values(),
  )
    .map(pub => pub.track)
    .find(track => track?.kind === "audio");

  const _micTrackRef = useTracks([
    { source: Track.Source.Microphone, withPlaceholder: false },
  ])[0];

  const connectRoom = async () => {
    try {
      if (!agentId) {
        setStatus("Önce agent oluştur.");
        return;
      }

      setStatus("Bağlanılıyor...");

      await session.start(); // ✅ Room.connect yerine

      setConnected(true);
      setStatus("Bağlandı");
    } catch (e) {
      console.error(e);
      setStatus("Bağlantı hatası");
    }
  };

  const disconnectRoom = async () => {
    await session.end(); // ✅ Room.disconnect yerine
    setConnected(false);
    setMicOn(false);
    setStatus("Bağlantı kapatıldı");
  };

  const startTalking = async () => {
    await _room.localParticipant.setMicrophoneEnabled(true);
    setMicOn(true);
    setStatus("Konuşuyorsun...");
  };

  const stopTalking = async () => {
    await _room.localParticipant.setMicrophoneEnabled(false);
    setMicOn(false);
    setStatus("Mikrofon kapalı");
  };

  return (
    <div className="bg-card border-border relative flex w-full flex-col overflow-hidden rounded-xl border shadow-lg lg:w-88 xl:w-1/3">
      {connected && <RoomAudioRenderer />}

      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        {/* ✅ Aura mic yerine */}
        <div className="mb-6">
          <AgentAudioVisualizerWave
            size="lg"
            color="#1FD5F9"
            audioTrack={microphoneTrack}
            state="speaking"
            blur={0.8}
            lineWidth={1}
            colorShift={0.8}
          />
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight">
          Temsilciyi Test Et
        </h3>

        <p className="text-muted-foreground mb-8 text-sm">
          Yapılandırmanızı gerçek zamanlı deneyimleyin.
        </p>

        <AgentTrackControl
          variant="default"
          source="microphone"
          audioTrack={microphoneTrack}
          kind="audioinput"
          className="mb-6 [&>button:nth-child(2)]:h-9 [&>button:nth-child(2)]:w-9"
        />
        <Button
          onClick={
            !connected ? connectRoom : micOn ? stopTalking : startTalking
          }
        >
          {!connected
            ? "Bağlan"
            : !micOn
              ? "Konuşmayı Başlat"
              : "Konuşmayı Durdur"}
        </Button>
        {connected && (
          <Button className="mt-3" onClick={disconnectRoom}>
            Bağlantıyı Kes
          </Button>
        )}
      </div>
    </div>
  );
};
