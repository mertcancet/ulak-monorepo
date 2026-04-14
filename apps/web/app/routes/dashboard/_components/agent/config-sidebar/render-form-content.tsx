import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";
import { Textarea } from "~/components/ui/textarea";
import { Field, SmallSelect, ToggleRow } from "./form-primitives";
import type { FormState, FormValue } from "./types";

export const renderFormContent = (
  label: string,
  formData: FormState,
  onFormChange: (field: string, value: FormValue) => void,
) => {
  switch (label) {
    case "Fonksiyonlar":
      return (
        <div className="space-y-4">
          <Field label="Fonksiyon Türü">
            <SmallSelect
              value={formData.functionType as string}
              placeholder="Seçin..."
              options={[
                { value: "appointment", label: "Randevu" },
                { value: "faq", label: "SSS" },
                { value: "crm", label: "CRM İşlemi" },
              ]}
              onValueChange={value => onFormChange("functionType", value)}
            />
          </Field>
          <Field label="Fonksiyon Adı">
            <Input
              placeholder="Örn: Randevu Kontrol"
              className="h-8 text-xs"
              value={(formData.functionName as string) || ""}
              onChange={e => onFormChange("functionName", e.target.value)}
            />
          </Field>
          <Field label="Açıklama">
            <Textarea
              placeholder="Fonksiyonun ne yaptığını açıklayın..."
              className="min-h-16 text-xs"
              value={(formData.functionDesc as string) || ""}
              onChange={e => onFormChange("functionDesc", e.target.value)}
            />
          </Field>
          <Field label="Timeout (sn)">
            <Input
              type="number"
              min="1"
              className="h-8 text-xs"
              value={(formData.functionTimeout as string) || "15"}
              onChange={e => onFormChange("functionTimeout", e.target.value)}
            />
          </Field>
          <ToggleRow
            label="Fonksiyon Aktif"
            checked={(formData.functionEnabled as boolean) ?? true}
            onCheckedChange={checked =>
              onFormChange("functionEnabled", checked)
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => console.log("Fonksiyon test edildi", formData)}
            >
              Test Et
            </Button>
            <Button
              size="sm"
              className="h-8 text-xs"
              onClick={() => console.log("Fonksiyon kaydedildi", formData)}
            >
              Kaydet
            </Button>
          </div>
        </div>
      );

    case "Bilgi Bankası":
      return (
        <div className="space-y-4">
          <Field label="Kaynak Tipi">
            <SmallSelect
              value={formData.sourceType as string}
              placeholder="Seçin..."
              options={[
                { value: "api", label: "API" },
                { value: "database", label: "Database" },
                { value: "documents", label: "Doküman" },
              ]}
              onValueChange={value => onFormChange("sourceType", value)}
            />
          </Field>
          <Field label="Veritabanı URL">
            <Input
              placeholder="https://api.example.com/db"
              className="h-8 text-xs"
              value={(formData.dbUrl as string) || ""}
              onChange={e => onFormChange("dbUrl", e.target.value)}
            />
          </Field>
          <Field label="API Anahtarı">
            <Input
              type="password"
              placeholder="API key..."
              className="h-8 text-xs"
              value={(formData.apiKey as string) || ""}
              onChange={e => onFormChange("apiKey", e.target.value)}
            />
          </Field>
          <Field label="Koleksiyon Adı">
            <Input
              placeholder="Örn: customer_faq"
              className="h-8 text-xs"
              value={(formData.collectionName as string) || ""}
              onChange={e => onFormChange("collectionName", e.target.value)}
            />
          </Field>
          <Field label="Bilgi Tabanı Türü">
            <SmallSelect
              value={formData.dbType as string}
              placeholder="Seçin..."
              options={[
                { value: "postgres", label: "PostgreSQL" },
                { value: "mongodb", label: "MongoDB" },
                { value: "elasticsearch", label: "Elasticsearch" },
              ]}
              onValueChange={value => onFormChange("dbType", value)}
            />
          </Field>
          <Field label="Top-K Sonuç">
            <Input
              type="number"
              min="1"
              className="h-8 text-xs"
              value={(formData.topK as string) || "5"}
              onChange={e => onFormChange("topK", e.target.value)}
            />
          </Field>
          <ToggleRow
            label="Semantik Arama Aktif"
            checked={(formData.semanticSearchEnabled as boolean) ?? true}
            onCheckedChange={checked =>
              onFormChange("semanticSearchEnabled", checked)
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => console.log("Bağlantı test edildi", formData)}
            >
              Test Et
            </Button>
            <Button
              size="sm"
              className="h-8 text-xs"
              onClick={() => console.log("Bilgi Bankası kaydedildi", formData)}
            >
              Kaydet
            </Button>
          </div>
        </div>
      );

    case "Konuşma Ayarları": {
      const speedValue = Number(formData.speed ?? "1");

      return (
        <div className="space-y-4">
          <Field label="Dil">
            <SmallSelect
              value={formData.language as string}
              placeholder="Seçin..."
              options={[
                { value: "tr", label: "Türkçe" },
                { value: "en", label: "English" },
                { value: "de", label: "Deutsch" },
              ]}
              onValueChange={value => onFormChange("language", value)}
            />
          </Field>
          <Field label={`Konuşma Hızı: ${speedValue.toFixed(1)}`}>
            <Slider
              min={0.5}
              max={2}
              step={0.1}
              value={[speedValue]}
              onValueChange={value =>
                onFormChange("speed", String(value[0] ?? 1))
              }
            />
          </Field>
          <Field label="Tonlama">
            <SmallSelect
              value={formData.tone as string}
              placeholder="Seçin..."
              options={[
                { value: "professional", label: "Profesyonel" },
                { value: "friendly", label: "Samimi" },
                { value: "formal", label: "Resmi" },
              ]}
              onValueChange={value => onFormChange("tone", value)}
            />
          </Field>
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() => console.log("Konuşma Ayarları kaydedildi", formData)}
          >
            Ayarları Kaydet
          </Button>
        </div>
      );
    }

    case "Canlı Transkripsiyon":
      return (
        <div className="space-y-4">
          <ToggleRow
            label="Transkripsiyon Aktif"
            checked={(formData.transcriptionEnabled as boolean) ?? false}
            onCheckedChange={checked =>
              onFormChange("transcriptionEnabled", checked)
            }
          />
          <Field label="Transkripsiyon Dili">
            <SmallSelect
              value={formData.transcriptionLang as string}
              placeholder="Seçin..."
              options={[
                { value: "tr", label: "Türkçe" },
                { value: "en", label: "English" },
              ]}
              onValueChange={value => onFormChange("transcriptionLang", value)}
            />
          </Field>
          <Field label="Çıkış Formatı">
            <SmallSelect
              value={formData.outputFormat as string}
              placeholder="Seçin..."
              options={[
                { value: "json", label: "JSON" },
                { value: "csv", label: "CSV" },
                { value: "text", label: "Düz Metin" },
              ]}
              onValueChange={value => onFormChange("outputFormat", value)}
            />
          </Field>
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() =>
              console.log("Transkripsiyon Ayarları kaydedildi", formData)
            }
          >
            Ayarları Kaydet
          </Button>
        </div>
      );

    case "Çağrı Ayarları":
      return (
        <div className="space-y-4">
          <Field
            label={`Maksimum Çağrı Süresi (dakika): ${(formData.maxCallDuration as string) ?? "60"}`}
          >
            <Input
              type="number"
              min="1"
              className="h-8 text-xs"
              value={(formData.maxCallDuration as string) || "60"}
              onChange={e => onFormChange("maxCallDuration", e.target.value)}
            />
          </Field>
          <Field label="Ses Kanalı">
            <SmallSelect
              value={formData.audioChannel as string}
              placeholder="Seçin..."
              options={[
                { value: "mono", label: "Mono" },
                { value: "stereo", label: "Stereo" },
              ]}
              onValueChange={value => onFormChange("audioChannel", value)}
            />
          </Field>
          <ToggleRow
            label="Otomatik Cevaplama"
            checked={(formData.autoAnswer as boolean) ?? false}
            onCheckedChange={checked => onFormChange("autoAnswer", checked)}
          />
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() => console.log("Çağrı Ayarları kaydedildi", formData)}
          >
            Ayarları Kaydet
          </Button>
        </div>
      );

    case "Çağrı Sonrası Veri":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <ToggleRow
              label="Çağrı Süresi"
              checked={(formData.recordCallDuration as boolean) ?? false}
              onCheckedChange={checked =>
                onFormChange("recordCallDuration", checked)
              }
            />
            <ToggleRow
              label="Duygu Analizi"
              checked={(formData.recordSentiment as boolean) ?? false}
              onCheckedChange={checked =>
                onFormChange("recordSentiment", checked)
              }
            />
            <ToggleRow
              label="Anahtar Kelimeler"
              checked={(formData.recordKeywords as boolean) ?? false}
              onCheckedChange={checked =>
                onFormChange("recordKeywords", checked)
              }
            />
            <ToggleRow
              label="Transkript"
              checked={(formData.recordTranscript as boolean) ?? false}
              onCheckedChange={checked =>
                onFormChange("recordTranscript", checked)
              }
            />
          </div>
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() => console.log("Veri Ayarları kaydedildi", formData)}
          >
            Ayarları Kaydet
          </Button>
        </div>
      );

    case "Güvenlik ve Yedekleme":
      return (
        <div className="space-y-4">
          <ToggleRow
            label="Şifreleme"
            checked={(formData.encryptionEnabled as boolean) ?? true}
            onCheckedChange={checked =>
              onFormChange("encryptionEnabled", checked)
            }
          />
          <Field label="Yedekleme Sıklığı">
            <SmallSelect
              value={formData.backupFrequency as string}
              placeholder="Seçin..."
              options={[
                { value: "daily", label: "Günlük" },
                { value: "weekly", label: "Haftalık" },
                { value: "monthly", label: "Aylık" },
              ]}
              onValueChange={value => onFormChange("backupFrequency", value)}
            />
          </Field>
          <ToggleRow
            label="Veri Tutma"
            checked={(formData.dataRetention as boolean) ?? true}
            onCheckedChange={checked => onFormChange("dataRetention", checked)}
          />
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() =>
              console.log("Güvenlik Ayarları kaydedildi", formData)
            }
          >
            Ayarları Kaydet
          </Button>
        </div>
      );

    case "Webhook Ayarları":
      return (
        <div className="space-y-4">
          <Field label="Webhook URL">
            <Input
              placeholder="https://api.example.com/webhook"
              className="h-8 text-xs"
              value={(formData.webhookUrl as string) || ""}
              onChange={e => onFormChange("webhookUrl", e.target.value)}
            />
          </Field>
          <Field label="Olay Türü">
            <SmallSelect
              value={formData.eventType as string}
              placeholder="Seçin..."
              options={[
                { value: "call-start", label: "Çağrı Başlangıcı" },
                { value: "call-end", label: "Çağrı Sonlandırması" },
                { value: "call-error", label: "Çağrı Hatası" },
              ]}
              onValueChange={value => onFormChange("eventType", value)}
            />
          </Field>
          <Field label="Retry Sayısı">
            <Input
              type="number"
              min="1"
              className="h-8 text-xs"
              value={(formData.retryCount as string) || "3"}
              onChange={e => onFormChange("retryCount", e.target.value)}
            />
          </Field>
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() => console.log("Webhook Ayarları kaydedildi", formData)}
          >
            Ayarları Kaydet
          </Button>
        </div>
      );

    case "MCP Entegrasyonları":
      return (
        <div className="space-y-4">
          <Field label="Servis URL">
            <Input
              placeholder="https://mcp.example.com"
              className="h-8 text-xs"
              value={(formData.mcpUrl as string) || ""}
              onChange={e => onFormChange("mcpUrl", e.target.value)}
            />
          </Field>
          <Field label="Authentication Token">
            <Input
              type="password"
              placeholder="Token..."
              className="h-8 text-xs"
              value={(formData.mcpToken as string) || ""}
              onChange={e => onFormChange("mcpToken", e.target.value)}
            />
          </Field>
          <ToggleRow
            label="MCP Aktif"
            checked={(formData.mcpEnabled as boolean) ?? false}
            onCheckedChange={checked => onFormChange("mcpEnabled", checked)}
          />
          <Button
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() => console.log("MCP Entegrasyonu kaydedildi", formData)}
          >
            Ayarları Kaydet
          </Button>
        </div>
      );

    default:
      return (
        <p className="text-muted-foreground text-xs">
          Ayarlar bulunmamaktadır.
        </p>
      );
  }
};
