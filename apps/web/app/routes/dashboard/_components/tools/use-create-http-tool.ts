import { useMutation } from "@tanstack/react-query";
import type { HttpToolFormData } from "@ulak/shared";
import { useNavigate } from "react-router";
import { toolsApi } from "~/lib/tools-api";

// TODO: workspaceId'yi gerçek workspace yönetiminden al
const WORKSPACE_ID = "019ddf6a-0046-7ee7-9ec3-12fe24bc631c";

const toCreateInput = (data: HttpToolFormData) => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: !data.allowToolChaining,
  settings: {
    type: "HTTP" as const,
    url: data.url,
    method: data.method,
    headers: Object.fromEntries(
      data.headers.filter(h => h.key.trim()).map(h => [h.key, h.value]),
    ),
    timeout: data.timeoutSeconds,
    parameters: Object.fromEntries(
      data.parameters.map(p => [
        p.name,
        { type: "string", description: p.description, required: p.required },
      ]),
    ),
    body_type: "json" as const,
    error_message: "",
  },
});

export function useCreateHttpTool() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: HttpToolFormData) =>
      toolsApi.createTool(WORKSPACE_ID, toCreateInput(data)),
    onSuccess: () => {
      navigate("/dashboard/tools");
    },
  });
}
