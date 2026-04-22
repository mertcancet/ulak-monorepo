import { Globe, PhoneOff } from "lucide-react";

export type ToolType = "http" | "end_call";

interface ToolTypeStepProps {
  onSelect: (type: ToolType) => void;
}

export function ToolTypeStep({ onSelect }: ToolTypeStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-foreground text-lg font-semibold">
          Araç türünü seçin
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Ajanınız için oluşturmak istediğiniz araç türünü seçin
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect("http")}
          className="border-border hover:border-foreground/30 hover:bg-secondary flex flex-col items-start gap-4 rounded-xl border p-5 text-left transition-all duration-150"
        >
          <div className="bg-secondary rounded-lg p-2.5">
            <Globe className="text-foreground size-5" />
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold">HTTP Tool</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Görüşme sırasında harici bir webhook veya API adresi çağırın
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect("end_call")}
          className="border-border hover:border-foreground/30 hover:bg-secondary flex flex-col items-start gap-4 rounded-xl border p-5 text-left transition-all duration-150"
        >
          <div className="bg-secondary rounded-lg p-2.5">
            <PhoneOff className="text-foreground size-5" />
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold">
              Çağrıyı Sonlandır
            </p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Ajan bu aracı tetiklediğinde görüşmeyi güvenli şekilde sonlandırın
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
