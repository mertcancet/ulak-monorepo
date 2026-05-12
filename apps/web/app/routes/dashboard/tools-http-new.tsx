import { ArrowLeft, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import DashboardHeader from "./_components/dashboard-header";
import type { HttpToolFormData } from "./_components/tools/http-tool-form";
import {
  defaultHttpToolData,
  HttpToolForm,
} from "./_components/tools/http-tool-form";
import { useCreateHttpTool } from "./_components/tools/use-create-http-tool";

export default function ToolsHttpNewPage() {
  const [data, setData] = useState<HttpToolFormData>(defaultHttpToolData);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const canCreate =
    data.name.trim() !== "" && data.url.trim() !== "" && isValidUrl(data.url);

  const { mutate: createTool, isPending } = useCreateHttpTool();

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
            <Globe className="size-3.5" />
            HTTP Tool
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
          <HttpToolForm data={data} onChange={setData} />
        </div>
      </div>
    </div>
  );
}
