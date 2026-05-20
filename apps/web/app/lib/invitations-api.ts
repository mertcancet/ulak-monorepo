import type {
  InvitationCreate,
  InvitationUpdate,
  InvitationWithEmail,
} from "@cleon/shared";
import { request } from "./fetcher";

export const invitationsApi = {
  listInvitations: (workspaceId: string) =>
    request<InvitationWithEmail[]>("/invitations", {
      headers: { "cleon-workspace-id": workspaceId },
    }),

  createInvitation: (workspaceId: string, body: InvitationCreate) =>
    request<{ id: string }>("/invitations", {
      method: "POST",
      body,
      headers: { "cleon-workspace-id": workspaceId },
    }),

  updateInvitation: (workspaceId: string, id: string, body: InvitationUpdate) =>
    request<{ id: string }>(`/invitations/${id}`, {
      method: "PATCH",
      body,
      headers: { "cleon-workspace-id": workspaceId },
    }),

  deleteInvitation: (workspaceId: string, id: string) =>
    request<void>(`/invitations/${id}`, {
      method: "DELETE",
      headers: { "cleon-workspace-id": workspaceId },
      parseAs: "void",
    }),

  acceptInvitation: (invitationId: string) =>
    request<void>("/invitations/accept", {
      method: "POST",
      body: { invitationId },
      parseAs: "void",
    }),

  declineInvitation: (invitationId: string) =>
    request<void>("/invitations/decline", {
      method: "POST",
      body: { invitationId },
      parseAs: "void",
    }),
};
