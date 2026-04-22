import { FileSpreadsheet, Megaphone, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import DashboardHeader from "../dashboard-header";

export function BulkCallsHeader() {
  const navigate = useNavigate();

  return (
    <DashboardHeader>
      <div className="flex items-center gap-3">
        <div className="bg-brand/10 text-brand flex h-8 w-8 items-center justify-center rounded-lg">
          <Megaphone className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-foreground font-display text-base font-semibold">
            Toplu Cagri
          </h1>
          <p className="text-muted-foreground text-xs">
            AI ile musteri, hasta ve hedef kitle aramalarini yonetin.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" className="gap-2">
          <FileSpreadsheet className="h-3.5 w-3.5" />
          CSV Yukle
        </Button>
        <Button type="button" variant="secondary" size="sm" className="gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          AI Script Uret
        </Button>
        <Button
          type="button"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/dashboard/bulk-calls/design")}
        >
          <Play className="h-3.5 w-3.5" />
          Kampanya Tasarla
        </Button>
      </div>
    </DashboardHeader>
  );
}
