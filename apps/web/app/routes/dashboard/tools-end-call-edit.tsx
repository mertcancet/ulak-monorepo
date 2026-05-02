import type {
  EndCallToolFormData,
  ToolItem,
  UpdateToolInput,
} from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, PhoneOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { toolsApi } from "~/lib/tools-api";
import DashboardHeader from "./_components/dashboard-header";
import {
  defaultEndCallToolData,
  EndCallToolForm,
} from "./_components/tools/end-call-tool-form";

// TODO: workspaceId'yi gerçek workspace yönetiminden al
const WORKSPACE_ID = "019ddf6a-0046-7ee7-9ec3-12fe24bc631c";

const toEndCallFormData = (tool: ToolItem): EndCallToolFormData => {
  if (tool.settings.type !== "EndCall") {
    return defaultEndCallToolData;
  }

  return {
    name: tool.name,
    description: tool.description,
    disallowInterruptions: Boolean(tool.disallowInterruptions),
    endInstructions: tool.settings.end_instructions ?? "",
  };
};

const toUpdateInput = (data: EndCallToolFormData): UpdateToolInput => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: data.disallowInterruptions,
  settings: {
    type: "EndCall",
    end_instructions: data.endInstructions,
  },
});

export default function ToolsEndCallEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState<EndCallToolFormData>(defaultEndCallToolData);

  const {
    data: tool,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tool", WORKSPACE_ID, id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.getTool(WORKSPACE_ID, id);
    },
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!tool || tool.settings.type !== "EndCall") {
      return;
    }
    setData(toEndCallFormData(tool));
  }, [tool]);

  const { mutate: updateTool, isPending } = useMutation({
    mutationFn: async (formData: EndCallToolFormData) => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.updateTool(WORKSPACE_ID, id, toUpdateInput(formData));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tools", WORKSPACE_ID],
      });
      await queryClient.invalidateQueries({
        queryKey: ["tool", WORKSPACE_ID, id],
      });
      navigate("/dashboard/tools");
    },
  });

  const canSave = data.name.trim() !== "";

  if (!id) {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-destructive text-sm">Geçersiz araç kimliği.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-muted-foreground text-sm">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (isError || !tool) {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <p className="text-destructive text-sm">
            Araç yüklenirken bir hata oluştu.
          </p>
          <Button asChild variant="outline">
            <Link to="/dashboard/tools">Araçlara dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (tool.settings.type !== "EndCall") {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <p className="text-muted-foreground text-sm">
            Bu araç EndCall türünde değil, uygun edit ekranına yönlendirin.
          </p>
          <Button asChild variant="outline">
            <Link to={`/dashboard/tools/${id}`}>Doğru edit ekranına git</Link>
          </Button>
        </div>
      </div>
    );
  }

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
            Araç düzenle
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
            onClick={() => updateTool(data)}
            disabled={!canSave || isPending}
          >
            {isPending ? "Kaydediliyor..." : "Kaydet"}
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
