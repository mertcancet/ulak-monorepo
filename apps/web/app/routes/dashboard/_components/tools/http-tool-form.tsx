import type { HttpToolFormData } from "@cleon/shared";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";

export type { HttpToolFormData };

interface HttpToolFormProps {
  data: HttpToolFormData;
  onChange: (data: HttpToolFormData) => void;
}

export function HttpToolForm({ data, onChange }: HttpToolFormProps) {
  const [newParamName, setNewParamName] = useState("");
  const [newParamDesc, setNewParamDesc] = useState("");

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const urlError =
    data.url.trim() !== "" && !isValidUrl(data.url)
      ? "Geçerli bir URL girin (örn. https://example.com/path)"
      : null;

  const update = (partial: Partial<HttpToolFormData>) => {
    onChange({ ...data, ...partial });
  };

  const addHeader = () => {
    update({
      headers: [
        ...data.headers,
        { id: crypto.randomUUID(), key: "", value: "" },
      ],
    });
  };

  const updateHeader = (index: number, field: "key" | "value", val: string) => {
    const updated = data.headers.map((h, i) =>
      i === index ? { ...h, [field]: val } : h,
    );
    update({ headers: updated });
  };

  const removeHeader = (index: number) => {
    update({ headers: data.headers.filter((_, i) => i !== index) });
  };

  const addParameter = () => {
    if (!newParamName.trim()) return;
    update({
      parameters: [
        ...data.parameters,
        {
          id: crypto.randomUUID(),
          name: newParamName.trim(),
          description: newParamDesc.trim(),
          required: false,
        },
      ],
    });
    setNewParamName("");
    setNewParamDesc("");
  };

  const removeParameter = (index: number) => {
    update({ parameters: data.parameters.filter((_, i) => i !== index) });
  };

  const queryString = [
    "?conversation_id=string",
    "&from_phone_number=string",
    "&to_phone_number=string",
    ...data.parameters.map(p => `&${p.name}=${p.name ? "string" : ""}`),
  ].join("\n");

  return (
    <div className="flex flex-col gap-8">
      {/* Basic Information */}
      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-semibold">
          Temel bilgiler
        </h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tool-name">Ad</Label>
          <Input
            id="tool-name"
            placeholder="e.g. send_sms"
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
          <Label htmlFor="tool-desc">Açıklama</Label>
          <Textarea
            id="tool-desc"
            placeholder="or. Belirli bir aliciya belirli bir mesaj gonder."
            value={data.description}
            onChange={e => update({ description: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="exec-mode">Çalışma modu</Label>
          <Select
            id="exec-mode"
            value={data.executionMode}
            onChange={e =>
              update({ executionMode: e.target.value as "sync" | "async" })
            }
          >
            <option value="sync">
              Senkron — gorusme, endpoint yanitini bekler
            </option>
            <option value="async">
              Asenkron — endpoint cagrilirken gorusme devam eder
            </option>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          {(
            [
              {
                key: "requireSpeechBefore",
                label: "Araç çağrısından önce konuşma zorunlu",
                description:
                  "Bu aracı çalıştırmadan önce ajanın konuşmasını zorunlu kılar",
              },
              {
                key: "waitForSpeechBefore",
                label: "Araç çağrısından önce konuşmayı bekle",
                description:
                  "Aracı çalıştırmadan önce ajanın konuşmasını tamamlamasını bekler",
              },
              {
                key: "forbidSpeechAfter",
                label: "Araç çağrısından sonra konuşmayı engelle",
                description:
                  "Bu araç çalıştıktan sonra ajanın konuşmasını engeller",
              },
              {
                key: "allowToolChaining",
                label: "Araç zincirlemeye izin ver",
                description:
                  "Bu araçtan sonra ajanın başka araçlar çalıştırmasına izin verir",
              },
            ] as const
          ).map(item => (
            <div
              key={item.key}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground text-sm font-medium">
                  {item.label}
                </span>
                <span className="text-muted-foreground text-xs">
                  {item.description}
                </span>
              </div>
              <Switch
                checked={data[item.key]}
                onCheckedChange={val => update({ [item.key]: val })}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Uc nokta */}
      <section className="flex flex-col gap-4">
        <h3 className="text-foreground text-sm font-semibold">End Point</h3>

        <div className="flex gap-2">
          <Select
            value={data.method}
            onChange={e =>
              update({ method: e.target.value as HttpToolFormData["method"] })
            }
            className="w-24 shrink-0"
          >
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
          <div className="flex flex-1 flex-col gap-1">
            <Input
              placeholder="or. https://my-app.com/phonic-tools/send-sms"
              value={data.url}
              onChange={e => update({ url: e.target.value })}
              className={urlError ? "border-destructive" : ""}
            />
            {urlError && <p className="text-destructive text-xs">{urlError}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {data.headers.length > 0 && (
            <div className="flex items-center justify-between">
              <Label>Header</Label>
              <span className="text-muted-foreground text-xs">
                {data.headers.length} header
              </span>
            </div>
          )}
          {data.headers.map((h, i) => (
            <div key={h.id} className="flex items-center gap-2">
              <Input
                placeholder="Header anahtari"
                value={h.key}
                onChange={e => updateHeader(i, "key", e.target.value)}
              />
              <Input
                placeholder="Header degeri"
                value={h.value}
                onChange={e => updateHeader(i, "value", e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeHeader(i)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={addHeader}
          >
            <Plus />
            Header ekle
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>Zaman aşımı</Label>
            <span className="text-muted-foreground text-xs">
              {data.timeoutSeconds}s
            </span>
          </div>
          <Slider
            min={1}
            max={120}
            value={[data.timeoutSeconds]}
            onValueChange={([v]) => update({ timeoutSeconds: v ?? 15 })}
          />
        </div>
      </section>

      {/* Parametreler */}
      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-foreground text-sm font-semibold">
            Parametreler
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Gorusmeden cikarilir ve istege eklenir
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {data.parameters.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              <Input value={p.name} readOnly className="w-36 shrink-0" />
              <Input
                placeholder="Açıklama"
                value={p.description}
                onChange={e => {
                  const updated = data.parameters.map((param, idx) =>
                    idx === i
                      ? { ...param, description: e.target.value }
                      : param,
                  );
                  update({ parameters: updated });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeParameter(i)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Parametre adi"
              value={newParamName}
              onChange={e =>
                setNewParamName(e.target.value.replace(/[^a-z0-9_]/g, ""))
              }
              className="w-36 shrink-0"
            />
            <Input
              placeholder="Açıklama"
              value={newParamDesc}
              onChange={e => setNewParamDesc(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addParameter}
              disabled={!newParamName.trim()}
            >
              <Plus />
            </Button>
          </div>
        </div>

        {(data.parameters.length > 0 || data.method === "GET") && (
          <div className="flex flex-col gap-1.5">
            <Label>Sorgu dizgesi</Label>
            <pre className="bg-secondary text-muted-foreground rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {queryString}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}

export const defaultHttpToolData: HttpToolFormData = {
  name: "",
  description: "",
  executionMode: "sync",
  requireSpeechBefore: false,
  waitForSpeechBefore: false,
  forbidSpeechAfter: false,
  allowToolChaining: true,
  method: "GET",
  url: "",
  headers: [],
  timeoutSeconds: 15,
  parameters: [],
};
