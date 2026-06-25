import { useQuery } from "@tanstack/react-query";
import { Phone, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { sipTrunksApi } from "~/lib/sip-api"; // Sip API dosyanızın yolu
import { useRoles } from "~/store/roles-store";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";

export default function SipSettingsPage() {
  const { selectedWorkspaceId } = useWorkspaceStore();
  const { permissions } = useRoles();
  const [searchQuery, setSearchQuery] = useState("");

  // TanStack Query ile SIP Trunk listesini çekiyoruz
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sip-trunks", selectedWorkspaceId],
    queryFn: async () => {
      // Bir önceki hatada öğrendiğimiz üzere api doğrudan unboxed veri dönüyor
      return await sipTrunksApi.listSipTrunks(selectedWorkspaceId || "");
    },
    enabled: !!selectedWorkspaceId,
  });

  const trunks = data ?? [];

  // Arama filtresi (Hem trunk adına hem de içindeki telefon numaralarına göre arar)
  const filteredTrunks = trunks.filter(trunk => {
    const matchesName = trunk.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesNumber = trunk.phoneNumbers.some(p =>
      p.number.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return matchesName || matchesNumber;
  });

  // SIP için rol yetki kontrolü (Örn: sip yetki şemasına göre)
  const _canCreateSipTrunk =
    permissions?.sip_trunk?.includes("*") ||
    permissions?.sip_trunk?.includes("create");
  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          SIP Ayarları
        </h1>
        <Button asChild>
          <Link to="/dashboard/sip-new">Trunk oluştur</Link>
        </Button>
      </DashboardHeader>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
        {/* Arama Çubuğu */}
        <div className="flex items-center justify-between gap-3">
          <div className="border-border bg-background flex h-9 items-center gap-2 rounded-lg border px-3">
            <Search className="text-muted-foreground size-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Trunk adı veya numara ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="text-foreground placeholder:text-muted-foreground w-48 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Yükleniyor Durumu */}
        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground text-sm">Yükleniyor...</p>
          </div>
        )}

        {/* Hata Durumu */}
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-destructive text-sm">
              SIP Trunk listesi yüklenirken bir hata oluştu.
            </p>
          </div>
        )}

        {/* Boş Liste Durumu */}
        {!isLoading && !isError && filteredTrunks.length === 0 && (
          <div className="border-border flex flex-1 flex-col items-center justify-center rounded-2xl border p-12">
            <div className="bg-secondary mb-4 flex size-14 items-center justify-center rounded-xl">
              <Phone className="text-muted-foreground size-6" />
            </div>
            <p className="text-foreground text-sm font-medium">
              {searchQuery ? "Sonuç bulunamadı" : "Henüz SIP Trunk yok"}
            </p>
            <p className="text-muted-foreground mt-1 text-center text-sm">
              {searchQuery
                ? "Arama kriterlerinize uygun bir bağlantı bulunamadı."
                : "Arama ve alma senaryoları için bir SIP Trunk hattı ekleyin."}
            </p>
          </div>
        )}

        {/* Listeleme Durumu */}
        {!isLoading && !isError && filteredTrunks.length > 0 && (
          <div className="flex flex-col gap-2">
            {filteredTrunks.map(trunk => (
              <Link
                key={trunk.id}
                to={`/dashboard/sip-settings/${trunk.id}`}
                className="border-border bg-background hover:bg-secondary flex items-center gap-4 rounded-xl border p-4 transition-colors"
              >
                {/* İkon Kutusu */}
                <div className="bg-secondary flex size-10 items-center justify-center rounded-lg">
                  <Phone className="text-muted-foreground size-4" />
                </div>

                {/* Detaylar */}
                <div className="flex flex-1 flex-col gap-0.5">
                  <p className="text-foreground text-sm font-medium">
                    {trunk.name}
                  </p>
                  <p className="text-muted-foreground line-clamp-1 text-xs">
                    {trunk.phoneNumbers.map(p => p.number).join(", ")}
                  </p>
                </div>

                {/* Dinamik Badge (Inbound / Outbound) */}
                <span className="text-muted-foreground border-border rounded-md border px-2 py-0.5 text-xs capitalize">
                  {trunk.type === "inbound"
                    ? "Gelen (Inbound)"
                    : "Giden (Outbound)"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
