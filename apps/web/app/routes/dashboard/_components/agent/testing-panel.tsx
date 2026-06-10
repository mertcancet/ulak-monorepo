import { Room } from "livekit-client";
import { Info, Mic } from "lucide-react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

interface TestingPanelProps {
  agentId?: string;
}

export const TestingPanel = ({ agentId }: TestingPanelProps) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [liveKitStatus, setLiveKitStatus] = useState<string>("");

  const [_activeTestt_setActiveTeststt] = useState<"voice" | "chat">("voice");
  const remoteAudioContainerRef = useRef<HTMLDivElement | null>(null);
  const attachedAudioElementsRef = useRef<HTMLMediaElement[]>([]);

  const detachRemoteAudios = useCallback((): void => {
    attachedAudioElementsRef.current.forEach(element => {
      element.remove();
    });
    attachedAudioElementsRef.current = [];
  }, []);

  const connectRoom = async (): Promise<void> => {
    try {
      setLiveKitStatus("LiveKit'e baglaniliyor...");

      if (room) {
        room.disconnect();
        detachRemoteAudios();
      }

      const newRoom = new Room();
      if (!agentId) {
        setLiveKitStatus("Once temsilciyi kaydedin.");
        return;
      }

      const tokenURL = new URL("/livekit/token", import.meta.env.VITE_API_URL);

      const tokenResponse = await fetch(tokenURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentId,
        }),
        credentials: "include",
      });

      if (!tokenResponse.ok) {
        throw new Error("Token alinamadi.");
      }

      const { token } = (await tokenResponse.json()) as { token?: string };

      if (!token) {
        throw new Error("Token response gecersiz.");
      }

      await newRoom.connect(import.meta.env.VITE_LIVEKIT_WS_URL, token);

      newRoom.on("trackSubscribed", track => {
        if (track.kind !== "audio") {
          return;
        }

        const element = track.attach();
        element.autoplay = true;
        remoteAudioContainerRef.current?.appendChild(element);
        attachedAudioElementsRef.current.push(element);
      });

      setRoom(newRoom);
      setConnected(true);
      setMicOn(false);
      setLiveKitStatus("LiveKit baglantisi kuruldu.");
    } catch (e) {
      console.error(e);
      setConnected(false);
      setMicOn(false);
      setLiveKitStatus("LiveKit baglantisi basarisiz oldu.");
    }
  };

  const startTalking = async (): Promise<void> => {
    if (!room) {
      return;
    }

    try {
      await room.localParticipant.setMicrophoneEnabled(true);
      setMicOn(true);
      setLiveKitStatus("Mikrofon acik.");
    } catch {
      setLiveKitStatus("Mikrofon acilamadi.");
    }
  };

  const stopTalking = async (): Promise<void> => {
    if (!room) {
      return;
    }

    try {
      await room.localParticipant.setMicrophoneEnabled(false);
      setMicOn(false);
      setLiveKitStatus("Mikrofon kapali.");
    } catch {
      setLiveKitStatus("Mikrofon kapatilamadi.");
    }
  };

  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
      }
      detachRemoteAudios();
    };
  }, [detachRemoteAudios, room]);

  return (
    <div className="bg-card border-border relative flex w-full flex-col overflow-hidden rounded-xl border shadow-lg lg:min-h-0 lg:w-88 xl:w-1/3">
      {/* <div className="border-border bg-secondary/30 flex items-center justify-between rounded-t-xl border-b p-2 backdrop-blur-sm">
        <div className="bg-background/50 border-border flex flex-1 space-x-1 rounded-lg border p-1 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTest("voice")}
            className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              activeTest === "voice"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:bg-background/80"
            }`}
          >
            <PhoneCall className="text-primary h-3.5 w-3.5" />
            <span>Ses Testi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTest("chat")}
            className={`flex flex-1 items-center justify-center space-x-2 rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
              activeTest === "chat"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:bg-background/80"
            }`}
          >
            <MessagesSquare className="h-3.5 w-3.5" />
            <span>Sohbet Testi</span>
          </button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:bg-background/80 ml-2 h-8 w-8"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div> */}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="bg-primary/5 group relative mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-20" />
          <div className="from-primary to-primary/80 shadow-primary/20 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br shadow-xl transition-transform group-hover:scale-105">
            <Mic className="h-8 w-8 text-white" />
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight">
          Temsilciyi Test Et
        </h3>
        <p className="text-muted-foreground mb-8 max-w-65 text-sm font-medium">
          Yapılandırmanızın nasıl çalıştığını gerçek zamanlı olarak
          deneyimleyin.
        </p>

        <div className="bg-primary/5 text-primary border-primary/10 mb-8 flex items-center space-x-2 rounded-full border px-4 py-2 text-[11px] font-bold">
          <Info className="h-3.5 w-3.5" />
          <span>Web aramalarında çağrı aktarma desteklenmez.</span>
        </div>

        <Button
          size="lg"
          type="button"
          onClick={
            !connected ? connectRoom : !micOn ? startTalking : stopTalking
          }
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {!connected
            ? "Canli Baglan"
            : !micOn
              ? "Konusmayi Baslat"
              : "Konusmayi Durdur"}
        </Button>
        {liveKitStatus ? (
          <p className="text-muted-foreground mt-3 text-xs font-medium">
            {liveKitStatus}
          </p>
        ) : null}

        <div ref={remoteAudioContainerRef} className="hidden" />
      </div>

      {/* Decorative background pulse for testing panel */}
      <div className="bg-primary/5 pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px]" />
    </div>
  );
};
