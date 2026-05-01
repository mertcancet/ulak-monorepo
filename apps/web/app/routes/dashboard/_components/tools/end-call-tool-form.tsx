import type { EndCallToolFormData } from "@cleon/shared";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { useCreateEndCallTool } from "./use-create-end-call-tool";

export type { EndCallToolFormData };

interface EndCallToolFormProps {
  data: EndCallToolFormData;
  onChange: (data: EndCallToolFormData) => void;
}

export function EndCallToolForm({ data, onChange }: EndCallToolFormProps) {
  const update = (partial: Partial<EndCallToolFormData>) => {
    onChange({ ...data, ...partial });
  };

  const { mutate: createTool, isPending } = useCreateEndCallTool();

  const canCreate = data.name.trim() !== "";

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-semibold">
          Temel bilgiler
        </h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end-call-name">Ad</Label>
          <Input
            id="end-call-name"
            placeholder="e.g. end_conversation"
            value={data.name}
            onChange={e =>
              update({ name: e.target.value.replace(/[^a-z0-9_]/g, "") })
            }
          />
          <p className="text-muted-foreground text-xs">
            Sadece kucuk harf, rakam ve alt cizgi icerebilir
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end-call-desc">Açıklama</Label>
          <Textarea
            id="end-call-desc"
            placeholder="or. Kullanici vedalastiginda ya da gorusme tamamlandiginda cagriyi sonlandir."
            value={data.description}
            onChange={e => update({ description: e.target.value })}
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground text-sm font-medium">
              Kesintilere izin verme
            </span>
            <span className="text-muted-foreground text-xs">
              Araç çalışırken kullanıcının konuşmasını engeller
            </span>
          </div>
          <Switch
            checked={data.disallowInterruptions}
            onCheckedChange={val => update({ disallowInterruptions: val })}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-foreground text-sm font-semibold">
            Sonlandırma talimatı
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Çağrı sonlandırılmadan önce ajana verilecek talimat (isteğe bağlı)
          </p>
        </div>
        <Textarea
          placeholder="or. Kullanıcıya görüşmenin sona erdiğini kibarca bildir."
          value={data.endInstructions}
          onChange={e => update({ endInstructions: e.target.value })}
          rows={3}
        />
      </section>

      <section className="bg-secondary/50 border-border rounded-xl border p-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Ajan bu araci tetiklediginde gorusme guvenli sekilde sonlandirilir.
        </p>
      </section>

      <div className="flex justify-end pt-2">
        <Button
          onClick={() => createTool(data)}
          disabled={!canCreate || isPending}
        >
          {isPending ? "Oluşturuluyor..." : "Oluştur"}
        </Button>
      </div>
    </div>
  );
}

export const defaultEndCallToolData: EndCallToolFormData = {
  name: "",
  description: "",
  disallowInterruptions: true,
  endInstructions: "",
};
