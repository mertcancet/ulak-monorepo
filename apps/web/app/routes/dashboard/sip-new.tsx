import type { SipTrunk, SipTrunkCreate } from "@cleon/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { sipTrunksApi } from "~/lib/sip-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";
import SipSettingsForm, {
  defaultSipTrunkFormData,
} from "./_components/sip-settings/sip-settings-form";

interface SipSettingsCreateProps {
  onSuccess?: () => void;
}

const SipSettingsCreate = ({ onSuccess }: SipSettingsCreateProps) => {
  const queryClient = useQueryClient();
  const { selectedWorkspaceId } = useWorkspaceStore();
  const _navigate = useNavigate();
  // Form verisini doğrudan SipTrunk tipi (veya ona as edilmiş varsayılan obje) ile yönetiyoruz
  const [formData, setFormData] = useState<SipTrunk>(
    defaultSipTrunkFormData as SipTrunk,
  );

  const {
    mutate: createTrunk,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: SipTrunkCreate) => {
      await sipTrunksApi.createSipTrunk(undefined, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sip-trunks", selectedWorkspaceId],
      });
      setFormData(defaultSipTrunkFormData as SipTrunk); // Formu sıfırla

      _navigate("/dashboard/sip-settings"); // Başarılı işlem sonrası yönlendirme
      if (onSuccess) onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formda tutulan phoneNumbers nesnelerinden ( { number: string, ... } )
    // sadece numaraları alıp SipTrunkCreate şemasının beklediği string[] dizisine dönüştürüyoruz.
    const phoneNumbersArray = (formData.phoneNumbers || [])
      .map(p => p.number)
      .filter(Boolean);

    const basePayload = {
      name: formData.name || "",
      username: formData.username || null,
      password: formData.password || null,
      phoneNumbers: phoneNumbersArray,
    };

    let payload: SipTrunkCreate;

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
        settings: { address: formData.settings?.address || "" },
      };
    }

    createTrunk(payload);
  };

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Yeni Sip Ayarı Ekle
        </h1>
      </DashboardHeader>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6"
      >
        {error && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm font-medium">
            Kayıt esnasında bir hata oluştu. Lütfen alanları kontrol edin.
          </div>
        )}

        <SipSettingsForm data={formData} onChange={setFormData} />

        <div className="mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SipSettingsCreate;
