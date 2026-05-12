import type { ToolItem, UpdateToolInput } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { DEFAULT_WORKSPACE_ID } from "~/lib/default-workspace-id";
import { toolsApi } from "~/lib/tools-api";
import DashboardHeader from "./_components/dashboard-header";
import type { HttpToolFormData } from "./_components/tools/http-tool-form";
import {
  defaultHttpToolData,
  HttpToolForm,
} from "./_components/tools/http-tool-form";

// TODO: workspaceId'yi gerçek workspace yönetiminden al

const toHttpFormData = (tool: ToolItem): HttpToolFormData => {
  if (tool.settings.type !== "HTTP") {
    return defaultHttpToolData;
  }

  return {
    name: tool.name,
    description: tool.description,
    disallowInterruptions: tool.disallowInterruptions,
    method: tool.settings.method,
    url: tool.settings.url,
    headers: tool.settings.headers,
    timeout: tool.settings.timeout ?? 15,
    parameters: tool.settings.parameters,
    body_type: tool.settings.body_type,
    body: tool.settings.body,
    query_params: tool.settings.query_params,
    follow_redirects: tool.settings.follow_redirects ?? false,
    max_retry: tool.settings.max_retry ?? 0,
    error_message: tool.settings.error_message,
    success_message: tool.settings.success_message ?? "",
  };
};

const toUpdateInput = (data: HttpToolFormData): UpdateToolInput => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: data.disallowInterruptions,
  settings: {
    type: "HTTP",
    url: data.url,
    method: data.method,
    headers: data.headers,
    timeout: data.timeout,
    parameters: data.parameters,
    body_type: data.body_type,
    body: data.body,
    query_params: data.query_params,
    follow_redirects: data.follow_redirects,
    max_retry: data.max_retry,
    error_message: data.error_message,
    success_message: data.success_message,
  },
});

export default function ToolsHttpEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState<HttpToolFormData>(defaultHttpToolData);

  const {
    data: tool,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tool", DEFAULT_WORKSPACE_ID, id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.getTool(DEFAULT_WORKSPACE_ID, id);
    },
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!tool || tool.settings.type !== "HTTP") {
      return;
    }
    setData(toHttpFormData(tool));
  }, [tool]);

  const { mutate: updateTool, isPending } = useMutation({
    mutationFn: async (formData: HttpToolFormData) => {
      if (!id) {
        throw new Error("Tool id gerekli");
      }
      return toolsApi.updateTool(
        DEFAULT_WORKSPACE_ID,
        id,
        toUpdateInput(formData),
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tools", DEFAULT_WORKSPACE_ID],
      });
      await queryClient.invalidateQueries({
        queryKey: ["tool", DEFAULT_WORKSPACE_ID, id],
      });
      navigate("/dashboard/tools");
    },
  });

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const canSave =
    data.name.trim() !== "" && data.url.trim() !== "" && isValidUrl(data.url);

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

  if (tool.settings.type !== "HTTP") {
    return (
      <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
        <DashboardHeader>
          <h1 className="text-foreground font-display text-base font-semibold">
            Araç düzenle
          </h1>
        </DashboardHeader>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <p className="text-muted-foreground text-sm">
            Bu araç HTTP türünde değil, uygun edit ekranına yönlendirin.
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
            <Globe className="size-3.5" />
            HTTP Tool
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
          <HttpToolForm data={data} onChange={setData} />
        </div>
      </div>
    </div>
  );
}
