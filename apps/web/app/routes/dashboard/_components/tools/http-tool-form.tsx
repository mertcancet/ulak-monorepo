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
    const key = `x-header-${Object.keys(data.headers ?? {}).length + 1}`;
    update({
      headers: {
        ...(data.headers ?? {}),
        [key]: "",
      },
    });
  };

  const updateHeader = (index: number, field: "key" | "value", val: string) => {
    const entries = Object.entries(data.headers ?? {});
    const target = entries[index];
    if (!target) {
      return;
    }

    const [currentKey] = target;

    if (field === "key") {
      const nextKey = val.trim();
      if (!nextKey || nextKey === currentKey) {
        return;
      }

      const nextHeaders = Object.fromEntries(
        entries.map(([k, v], i) => (i === index ? [nextKey, v] : [k, v])),
      );
      update({ headers: nextHeaders });
      return;
    }

    update({
      headers: {
        ...(data.headers ?? {}),
        [currentKey]: val,
      },
    });
  };

  const removeHeader = (index: number) => {
    const nextHeaders = Object.fromEntries(
      Object.entries(data.headers ?? {}).filter((_, i) => i !== index),
    );
    update({ headers: nextHeaders });
  };

  const addParameter = () => {
    if (!newParamName.trim()) return;
    update({
      parameters: {
        ...(data.parameters ?? {}),
        [newParamName.trim()]: {
          type: "string",
          description: newParamDesc.trim(),
          required: false,
        },
      },
    });
    setNewParamName("");
    setNewParamDesc("");
  };

  const removeParameter = (index: number) => {
    const nextParams = Object.fromEntries(
      Object.entries(data.parameters ?? {}).filter((_, i) => i !== index),
    );
    update({ parameters: nextParams });
  };

  const queryString = [
    "?conversation_id=string",
    "&from_phone_number=string",
    "&to_phone_number=string",
    ...Object.keys(data.parameters ?? {}).map(
      p => `&${p}=${p ? "string" : ""}`,
    ),
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

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground text-sm font-medium">
              Araç zincirlemeye izin ver
            </span>
            <span className="text-muted-foreground text-xs">
              Bu araçtan sonra ajanın başka araçlar çalıştırmasına izin verir
            </span>
          </div>
          <Switch
            checked={!data.disallowInterruptions}
            onCheckedChange={val => update({ disallowInterruptions: !val })}
          />
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
          {Object.keys(data.headers ?? {}).length > 0 && (
            <div className="flex items-center justify-between">
              <Label>Header</Label>
              <span className="text-muted-foreground text-xs">
                {Object.keys(data.headers ?? {}).length} header
              </span>
            </div>
          )}
          {Object.entries(data.headers ?? {}).map(([key, value], i) => (
            <div key={`${key}`} className="flex items-center gap-2">
              <Input
                placeholder="Header anahtari"
                value={key}
                onChange={e => updateHeader(i, "key", e.target.value)}
              />
              <Input
                placeholder="Header degeri"
                value={value}
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
              {data.timeout ?? 15}s
            </span>
          </div>
          <Slider
            min={1}
            max={120}
            value={[data.timeout ?? 15]}
            onValueChange={([v]) => update({ timeout: v ?? 15 })}
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
          {Object.entries(data.parameters ?? {}).map(([name, value], i) => {
            const parsedValue =
              typeof value === "object" && value !== null
                ? (value as Record<string, unknown>)
                : {};

            return (
              <div key={`${name}`} className="flex items-center gap-2">
                <Input value={name} readOnly className="w-36 shrink-0" />
                <Input
                  placeholder="Açıklama"
                  value={
                    typeof parsedValue.description === "string"
                      ? parsedValue.description
                      : ""
                  }
                  onChange={e => {
                    update({
                      parameters: {
                        ...(data.parameters ?? {}),
                        [name]: {
                          ...parsedValue,
                          type: "string",
                          description: e.target.value,
                          required:
                            typeof parsedValue.required === "boolean"
                              ? parsedValue.required
                              : false,
                        },
                      },
                    });
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
            );
          })}

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

        {(Object.keys(data.parameters ?? {}).length > 0 ||
          data.method === "GET") && (
          <div className="flex flex-col gap-1.5">
            <Label>Sorgu dizgesi</Label>
            <pre className="bg-secondary text-muted-foreground rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre">
              {queryString}
            </pre>
          </div>
        )}
      </section>

      {/* Request Body */}
      {(data.method === "POST" ||
        data.method === "PUT" ||
        data.method === "PATCH") && (
        <section className="flex flex-col gap-4">
          <h3 className="text-foreground text-sm font-semibold">
            İstek Gövdesi
          </h3>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="body-type">Body Türü</Label>
            <Select
              id="body-type"
              value={data.body_type}
              onChange={e =>
                update({ body_type: e.target.value as "json" | "form-data" })
              }
            >
              <option value="json">JSON</option>
              <option value="form-data">Form Data</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="body">Body İçeriği</Label>
            <Textarea
              id="body"
              placeholder='{"key": "value"}'
              value={data.body ?? ""}
              onChange={e => update({ body: e.target.value })}
              className="font-mono text-xs"
              rows={6}
            />
          </div>
        </section>
      )}

      {/* Query Parameters */}
      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-foreground text-sm font-semibold">
            Sorgu Parametreleri
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            URL'ye dinamik olarak eklenir
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {Object.entries(data.query_params ?? {}).map(([key, value], i) => (
            <div key={`query-param-${key}`} className="flex items-center gap-2">
              <Input
                placeholder="Parametre anahtarı"
                value={key}
                readOnly
                className="w-36 shrink-0"
              />
              <Input
                placeholder="Değer"
                value={value}
                onChange={e => {
                  const nextParams = Object.fromEntries(
                    Object.entries(data.query_params ?? {}).map(
                      ([k, v], idx) =>
                        idx === i ? [k, e.target.value] : [k, v],
                    ),
                  );
                  update({ query_params: nextParams });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const nextParams = Object.fromEntries(
                    Object.entries(data.query_params ?? {}).filter(
                      (_, idx) => idx !== i,
                    ),
                  );
                  update({ query_params: nextParams });
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Settings */}
      <section className="flex flex-col gap-4">
        <h3 className="text-foreground text-sm font-semibold">
          Gelişmiş Ayarlar
        </h3>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label>Yeniden Yönlendirmeleri İzle</Label>
            <Switch
              checked={data.follow_redirects ?? false}
              onCheckedChange={val => update({ follow_redirects: val })}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            3xx durum kodlarında yeniden yönlendirmeleri otomatik olarak izler
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="max-retry">Maksimum Yeniden Deneme</Label>
          <div className="flex items-center gap-4">
            <Input
              id="max-retry"
              type="number"
              min="0"
              max="10"
              value={data.max_retry ?? 0}
              onChange={e =>
                update({
                  max_retry: Math.max(0, parseInt(e.target.value, 10) || 0),
                })
              }
              className="w-20"
            />
            <span className="text-muted-foreground text-xs">
              {data.max_retry ?? 0} denemeler
            </span>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="flex flex-col gap-4">
        <h3 className="text-foreground text-sm font-semibold">Mesajlar</h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="error-message">Hata Mesajı</Label>
          <Textarea
            id="error-message"
            placeholder="Başarısız oldu: {error_description}"
            value={data.error_message}
            onChange={e => update({ error_message: e.target.value })}
            rows={3}
          />
          <p className="text-muted-foreground text-xs">
            İstek başarısız olduğunda gösterilecek mesaj
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="success-message">Başarı Mesajı</Label>
          <Textarea
            id="success-message"
            placeholder="İşlem başarıyla tamamlandı"
            value={data.success_message ?? ""}
            onChange={e => update({ success_message: e.target.value })}
            rows={3}
          />
          <p className="text-muted-foreground text-xs">
            İstek başarılı olduğunda gösterilecek mesaj
          </p>
        </div>
      </section>
    </div>
  );
}

export const defaultHttpToolData: HttpToolFormData = {
  name: "",
  description: "",
  disallowInterruptions: false,
  method: "GET",
  url: "",
  headers: {},
  timeout: 15,
  parameters: {},
  body_type: "json",
  body: "",
  query_params: {},
  follow_redirects: false,
  max_retry: 0,
  error_message: "",
  success_message: "",
};
