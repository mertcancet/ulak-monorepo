import type { EndCallToolFormData } from "@ulak/shared";
import { ArrowLeft, PhoneOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import DashboardHeader from "./_components/dashboard-header";
import {
  defaultEndCallToolData,
  EndCallToolForm,
} from "./_components/tools/end-call-tool-form";
import { useCreateEndCallTool } from "./_components/tools/use-create-end-call-tool";

export default function ToolsEndCallNewPage() {
  const [data, setData] = useState<EndCallToolFormData>(defaultEndCallToolData);

  const canCreate = data.name.trim() !== "";

  const { mutate: createTool, isPending } = useCreateEndCallTool();

  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/tools/new"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-foreground font-display text-base font-semibold">
            Yeni araç
          </h1>
          <span className="bg-secondary text-foreground flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium">
            <PhoneOff className="size-3.5" />
            Çağrıyı Sonlandır
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/dashboard/tools">İptal</Link>
          </Button>
          <Button
            onClick={() => createTool(data)}
            disabled={!canCreate || isPending}
          >
            {isPending ? "Oluşturuluyor..." : "Oluştur"}
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mx-auto w-full max-w-2xl">
          <EndCallToolForm data={data} onChange={setData} />
        </div>
      </div>
    </div>
  );
}
