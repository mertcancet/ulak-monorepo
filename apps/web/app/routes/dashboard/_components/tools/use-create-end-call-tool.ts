import type { EndCallToolFormData } from "@cleon/shared";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { DEFAULT_WORKSPACE_ID } from "~/lib/default-workspace-id";
import { toolsApi } from "~/lib/tools-api";

// TODO: workspaceId'yi gerçek workspace yönetiminden al
const toCreateInput = (data: EndCallToolFormData) => ({
  name: data.name,
  description: data.description,
  disallowInterruptions: data.disallowInterruptions,
  settings: {
    type: "EndCall" as const,
    end_instructions: data.endInstructions,
  },
});

export function useCreateEndCallTool() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: EndCallToolFormData) =>
      toolsApi.createTool(DEFAULT_WORKSPACE_ID, toCreateInput(data)),
    onSuccess: () => navigate("/dashboard/tools"),
  });
}
