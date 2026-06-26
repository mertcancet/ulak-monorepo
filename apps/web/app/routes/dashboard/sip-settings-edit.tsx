import type { SipTrunk, SipTrunkUpdate } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { sipTrunksApi } from "~/lib/sip-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";
import SipSettingsForm from "./_components/sip-settings/sip-settings-form";

const SipSettingsEdit = () => {
  const { trunkId } = useParams();
  const queryClient = useQueryClient();
  const _navigate = useNavigate();
  const { selectedWorkspaceId } = useWorkspaceStore();

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

  const {
    mutate: deleteTrunk,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    // Tetiklerken silinecek sip trunk ID'sini parametre olarak gönderiyorsun
    mutationFn: async () => {
      await sipTrunksApi.deleteSipTrunk(undefined, trunkId || "");
    },
    onSuccess: () => {
      // Silme başarılı olunca listeyi tazelemek için cache'i patlatıyoruz
      queryClient.invalidateQueries({
        queryKey: ["sip-trunks", selectedWorkspaceId],
      });

      _navigate("/dashboard/sip-settings"); // Silme işleminden sonra yönlendirme

      // Buraya silme işleminden sonra çalışmasını istediğin yönlendirme (navigasyon)
      // veya modal kapatma gibi ek mantıkları yazabilirsin.
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
        <SipSettingsForm
          data={{ ...formData, password: null } as SipTrunk} // Password'ü null olarak geçiyoruz, çünkü formda gösterilmeyecek
          onChange={setFormData}
          isEdit
        />

        <div className="mt-4 flex justify-between">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
          </Button>

          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => {
              if (
                confirm(
                  "Bu SIP trunk kaydını silmek istediğinize emin misiniz?",
                )
              ) {
                deleteTrunk(); // Veya silmek istediğin trunk'ın ID'si
              }
            }}
          >
            <Trash className="mr-1 size-4" />
            {isDeleting ? "Siliniyor..." : "Sil"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SipSettingsEdit;
