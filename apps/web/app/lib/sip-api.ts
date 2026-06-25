import type { SipTrunk, SipTrunkCreate, SipTrunkUpdate } from "@cleon/shared";
import { request } from "./fetcher";

export const sipTrunksApi = {
  // GET /sip/trunks
  listSipTrunks: (workspaceId: string | undefined) =>
    request<SipTrunk[]>("/sip/trunks", {
      ...(workspaceId
        ? { headers: { "cleon-workspace-id": workspaceId } }
        : {}),
    }),
  getSipTrunk: (workspaceId: string | undefined, id: string) =>
    request<SipTrunk>(`/sip/trunks/${id}`, {
      ...(workspaceId
        ? { headers: { "cleon-workspace-id": workspaceId } }
        : {}),
    }),
  // POST /sip/trunks
  createSipTrunk: (workspaceId: string | undefined, body: SipTrunkCreate) =>
    request<{ id: string }>("/sip/trunks", {
      method: "POST",
      body,
      ...(workspaceId
        ? { headers: { "cleon-workspace-id": workspaceId } }
        : {}),
    }),

  // PATCH /sip/trunks/{id}
  updateSipTrunk: (
    workspaceId: string | undefined,
    id: string,
    body: SipTrunkUpdate,
  ) =>
    request<{ id: string }>(`/sip/trunks/${id}`, {
      method: "PATCH",
      body,
      ...(workspaceId
        ? { headers: { "cleon-workspace-id": workspaceId } }
        : {}),
    }),

  // DELETE /sip/trunks/{id}
  deleteSipTrunk: (workspaceId: string | undefined, id: string) =>
    request<void>(`/sip/trunks/${id}`, {
      method: "DELETE",
      ...(workspaceId
        ? { headers: { "cleon-workspace-id": workspaceId } }
        : {}),
      parseAs: "void",
    }),
};
