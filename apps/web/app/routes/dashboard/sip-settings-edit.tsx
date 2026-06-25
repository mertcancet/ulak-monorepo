import type { SipTrunk, SipTrunkUpdate } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { sipTrunksApi } from "~/lib/sip-api";
import DashboardHeader from "./_components/dashboard-header";
import SipSettingsForm from "./_components/sip-settings/sip-settings-form";

const SipSettingsEdit = () => {
  const { trunkId } = useParams();
  const queryClient = useQueryClient();

  // Artık SipTrunkFormData yerine doğrudan SipTrunk tipini kullanıyoruz
  const [formData, setFormData] = useState<SipTrunk | null>(null);

  const { data: trunks, isLoading } = useQuery({
    queryKey: ["sip-trunks", trunkId],
    queryFn: async () => {
      return await sipTrunksApi.getSipTrunk(undefined, trunkId || "");
    },
    // API'den gelen veriyi doğrudan SipTrunk formatında alıyoruz.
    // Düz string'e dönüştürme (join) işlemlerini kaldırdık çünkü form objeleri/dizileri destekliyor.
    select: (apiData): SipTrunk => {
      // Gerekirse burada apiData üzerinden ufak type validation'lar yapabilirsiniz
      return apiData as SipTrunk;
    },
  });

  // Veri başarıyla geldiğinde state'i güncelle
  useEffect(() => {
    if (trunks) {
      setFormData(trunks);
    }
  }, [trunks]);

  const {
    mutate: updateTrunk,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: SipTrunkUpdate) => {
      await sipTrunksApi.updateSipTrunk(undefined, trunkId || "", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sip-trunks", undefined] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    // Formda tutulan phoneNumbers: { id, sipTrunkId, number }[] formatında.
    // Update schema (SipTrunkUpdate) ise bizden z.e164() yani string[] bekliyor.
    const phoneNumbersArray = (formData.phoneNumbers || [])
      .map(p => p.number)
      .filter(Boolean);

    const basePayload = {
      name: formData.name,
      username: formData.username || null,
      password: formData.password || null,
      phoneNumbers: phoneNumbersArray,
    };

    let payload: SipTrunkUpdate;

    if (formData.type === "inbound") {
      payload = {
        ...basePayload,
        type: "inbound",
        settings:
          formData.settings?.allowedAddresses &&
          formData.settings.allowedAddresses.length > 0
            ? { allowedAddresses: formData.settings.allowedAddresses }
            : null,
      };
    } else {
      payload = {
        ...basePayload,
        type: "outbound",
        // Hedef IP adresi outbound için zorunlu, formdan doğrudan çekiyoruz.
        settings: { address: formData.settings?.address || "" },
      };
    }

    updateTrunk(payload);
  };

  if (isLoading) {
    return (
      <div className="text-muted-foreground p-6 text-sm">Yükleniyor...</div>
    );
  }

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Sip Ayarlarını Düzenle
        </h1>
      </DashboardHeader>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6"
      >
        {error && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm font-medium">
            Güncelleme esnasında bir hata oluştu. Lütfen alanları kontrol edin.
          </div>
        )}

        {/* formData artık doğrudan bir SipTrunk nesnesi */}
        <SipSettingsForm data={formData} onChange={setFormData} />

        <div className="mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SipSettingsEdit;
