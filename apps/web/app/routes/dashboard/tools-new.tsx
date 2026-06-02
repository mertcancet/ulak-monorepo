import { ArrowLeft, Globe, PhoneOff, Split } from "lucide-react";
import { Link, useNavigate } from "react-router";
import DashboardHeader from "./_components/dashboard-header";

export default function ToolsNewPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tools"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-foreground font-display text-base font-semibold">
            Yeni araç
          </h1>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-6">
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
              onClick={() => navigate("/dashboard/tools/http/new")}
              className="border-border hover:border-foreground/30 hover:bg-secondary flex flex-col items-start gap-4 rounded-xl border p-5 text-left transition-all duration-150"
            >
              <div className="bg-secondary rounded-lg p-2.5">
                <Globe className="text-foreground size-5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  HTTP Tool
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Görüşme sırasında harici bir webhook veya API adresi çağırın
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/tools/end-call/new")}
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
                  Ajan bu aracı tetiklediğinde görüşmeyi güvenli şekilde
                  sonlandırın
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/tools/agent-handoff/new")}
              className="border-border hover:border-foreground/30 hover:bg-secondary flex flex-col items-start gap-4 rounded-xl border p-5 text-left transition-all duration-150"
            >
              <div className="bg-secondary rounded-lg p-2.5">
                <Split className="text-foreground size-5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  Ajan Aktarımı
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Aramayı başka bir ajana aktarmak için hedef ajanı bağlayın
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
