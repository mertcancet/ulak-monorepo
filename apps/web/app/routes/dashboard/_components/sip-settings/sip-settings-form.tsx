import type { SipTrunk } from "@cleon/shared";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";

interface SipSettingsFormProps {
  data: SipTrunk | null;
  onChange: (data: SipTrunk) => void;
}

export default function SipSettingsForm({
  data,
  onChange,
}: SipSettingsFormProps) {
  // Temel özellikler için genel güncelleme fonksiyonu
  const updateBase = (partial: Partial<SipTrunk>) => {
    if (data) {
      onChange({ ...data, ...partial } as SipTrunk);
    }
  };

  // Trunk tipi değiştiğinde settings objesini yeni tipe göre uyarlar
  const handleTypeChange = (newType: "inbound" | "outbound") => {
    if (!data) return;

    if (newType === "inbound") {
      onChange({
        ...data,
        type: "inbound",
        settings: null, // veya varsayılan { allowedAddresses: [] }
      } as SipTrunk);
    } else {
      onChange({
        ...data,
        type: "outbound",
        settings: { address: "" },
      } as SipTrunk);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Bölüm 1: Temel Bilgiler */}
      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-semibold">
          Temel bilgiler
        </h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sip-name">Trunk Adı</Label>
          <Input
            id="sip-name"
            placeholder="Örn. Ana Ofis Trunk"
            value={data?.name || ""}
            onChange={e => updateBase({ name: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sip-type">Tip</Label>
          <Select
            id="sip-type"
            value={data?.type || "inbound"}
            onChange={e =>
              handleTypeChange(e.target.value as "inbound" | "outbound")
            }
          >
            <option value="inbound">Gelen (Inbound)</option>
            <option value="outbound">Giden (Outbound)</option>
          </Select>
        </div>
      </section>

      {/* Bölüm 2: Kimlik Doğrulama Ayarları */}
      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-semibold">
          Kimlik doğrulama
        </h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sip-user-name">Kullanıcı adı</Label>
          <Input
            id="sip-user-name"
            placeholder="Örn. satis_destek_agent"
            value={data?.username || ""}
            onChange={e => updateBase({ username: e.target.value })}
          />
          <p className="text-muted-foreground text-xs">
            En az 3 karakter olmalıdır
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sip-password">Parola</Label>
          <Input
            id="sip-password"
            placeholder="Örn. ********"
            type="password"
            value={data?.password || ""}
            onChange={e => updateBase({ password: e.target.value })}
          />
          <p className="text-muted-foreground text-xs">
            En az 8 karakter olmalıdır
          </p>
        </div>
      </section>

      {/* Bölüm 3: Bağlantı ve Ağ Ayarları */}
      <section className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-semibold">
          Bağlantı ve ağ ayarları
        </h3>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sip-phone-number">Telefon Numaraları</Label>
          <Input
            id="sip-phone-number"
            placeholder="Örn. +905001234567, +905007654321"
            // 1. Gösterim: Obje dizisindeki 'number' alanlarını map'leyip string olarak birleştiriyoruz
            value={data?.phoneNumbers?.map(p => p.number).join(", ") || ""}
            onChange={e => {
              // Kullanıcının girdiği virgülle ayrılmış değerleri diziye alıyoruz
              const stringNumbers = e.target.value
                .split(",")
                .map(v => v.trim())
                .filter(v => v.length > 0);

              const existingPhoneNumbers = data?.phoneNumbers || [];

              // 2. Güncelleme: String dizisini, TypeScript'in beklediği obje dizisine dönüştürüyoruz
              const mappedNumbers = stringNumbers.map(num => {
                // Eğer bu numara hali hazırda form state'inde varsa, eski objeyi (id'leri ile beraber) koru
                const existing = existingPhoneNumbers.find(
                  p => p.number === num,
                );

                // Eğer yeni eklenmiş bir numaraysa, beklenen objeyi oluştur
                // Not: "id" ve "sipTrunkId" arka planda veya Zod şemasında nasıl yönetiliyorsa
                // buraya geçici bir değer ("") veya random bir uuid eklemeniz gerekebilir.
                return existing || { id: "", sipTrunkId: "", number: num };
              });

              updateBase({ phoneNumbers: mappedNumbers });
            }}
            required
          />
          <p className="text-muted-foreground text-xs">
            Birden fazla numara için aralarına virgül (,) koyabilirsiniz.
          </p>
        </div>

        {/* Tipe göre dinamik render edilen settings alanları */}
        {data?.type === "inbound" ? (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sip-allowed-addresses">
              İzin Verilen IP Adresleri (CIDR)
            </Label>
            <Input
              id="sip-allowed-addresses"
              placeholder="Örn. 192.168.1.1, 10.0.0.0/24"
              value={data.settings?.allowedAddresses?.join(", ") || ""}
              onChange={e => {
                const addressesArray = e.target.value
                  .split(",")
                  .map(v => v.trim())
                  .filter(v => v.length > 0);

                onChange({
                  ...data,
                  type: "inbound",
                  settings: {
                    ...data.settings,
                    // Eğer dizi boşsa nullish kuralına uygun olarak null/undefined gönderilir
                    allowedAddresses:
                      addressesArray.length > 0 ? addressesArray : null,
                  },
                });
              }}
            />
            <p className="text-muted-foreground text-xs">
              Kullanıcı adı ve parola boş bırakıldığında bu alanın doldurulması
              zorunludur.
            </p>
          </div>
        ) : data?.type === "outbound" ? (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sip-address">Domain / Hedef IP Adresi</Label>
            <Input
              id="sip-address"
              placeholder="Örn. sip.example.com veya 185.85.85.85"
              value={data.settings?.address || ""}
              onChange={e => {
                onChange({
                  ...data,
                  type: "outbound",
                  settings: {
                    ...data.settings,
                    address: e.target.value,
                  },
                });
              }}
              required
            />
            <p className="text-muted-foreground text-xs">
              SIP INVITE talebinin gönderileceği adrestir (sip: protokolü
              içermemelidir).
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
export const defaultSipTrunkFormData: SipTrunk = {
  id: "",
  workspaceId: "",
  lkTrunkId: "",
  name: "",
  type: "inbound", // Başlangıç türü olarak "inbound" seçildi
  username: null,
  password: null,
  phoneNumbers: [], // Hatada belirtilen [{ id, sipTrunkId, number }] yapısına uygun boş dizi
  settings: {
    allowedAddresses: null,
  },
  createdAt: new Date(),
};
