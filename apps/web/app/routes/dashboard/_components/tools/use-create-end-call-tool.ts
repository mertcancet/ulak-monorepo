import { useMutation } from "@tanstack/react-query";
import type { EndCallToolFormData } from "@ulak/shared";
import { useNavigate } from "react-router";
import { toolsApi } from "~/lib/tools-api";

// TODO: workspaceId'yi gerçek workspace yönetiminden al
const WORKSPACE_ID = "019ddf6a-0046-7ee7-9ec3-12fe24bc631c";

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
      toolsApi.createTool(WORKSPACE_ID, toCreateInput(data)),
    onSuccess: () => navigate("/dashboard/tools"),
  });
}
