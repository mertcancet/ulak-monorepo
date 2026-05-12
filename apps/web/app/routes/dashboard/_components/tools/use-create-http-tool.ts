import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { DEFAULT_WORKSPACE_ID } from "~/lib/default-workspace-id";
import { toolsApi } from "~/lib/tools-api";
import type { HttpToolFormData } from "./http-tool-form";

// TODO: workspaceId'yi gerçek workspace yönetiminden al

const toCreateInput = (data: HttpToolFormData) => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: data.disallowInterruptions,
  settings: {
    type: "HTTP" as const,
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

export function useCreateHttpTool() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: HttpToolFormData) =>
      toolsApi.createTool(DEFAULT_WORKSPACE_ID, toCreateInput(data)),
    onSuccess: () => {
      navigate("/dashboard/tools");
    },
  });
}
