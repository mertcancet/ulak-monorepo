import type { Role } from "@cleon/shared";
import { useCallback, useEffect } from "react";
import { create } from "zustand";

import { DEFAULT_WORKSPACE_ID } from "~/lib/default-workspace-id";
import { rolesApi } from "~/lib/roles-api";

interface RolesState {
  roles: Role[];
  workspaceId: string;
  isLoading: boolean;
  error: string | null;
  setWorkspaceId: (workspaceId: string) => void;
  clearRoles: () => void;
  fetchRoles: (workspaceId?: string) => Promise<Role[]>;
  refreshRoles: () => Promise<Role[]>;
}

export const useRolesStore = create<RolesState>((set, get) => ({
  roles: [],
  workspaceId: DEFAULT_WORKSPACE_ID,
  isLoading: false,
  error: null,
  setWorkspaceId: (workspaceId: string) => {
    set({ workspaceId });
  },
  clearRoles: () => {
    set({ roles: [], error: null, isLoading: false });
  },
  fetchRoles: async (workspaceId?: string) => {
    const nextWorkspaceId = workspaceId ?? get().workspaceId;

    set({
      isLoading: true,
      error: null,
      workspaceId: nextWorkspaceId,
    });

    try {
      const roles = await rolesApi.listRoles(nextWorkspaceId);
      set({ roles, isLoading: false });

      return roles;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Roller yuklenemedi.";
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  refreshRoles: async () => {
    return get().fetchRoles(get().workspaceId);
  },
}));

export const useRoles = (workspaceId = DEFAULT_WORKSPACE_ID) => {
  const roles = useRolesStore(state => state.roles);
  const isLoading = useRolesStore(state => state.isLoading);
  const error = useRolesStore(state => state.error);
  const fetchRoles = useRolesStore(state => state.fetchRoles);

  useEffect(() => {
    void fetchRoles(workspaceId);
  }, [fetchRoles, workspaceId]);

  const refresh = useCallback(
    () => fetchRoles(workspaceId),
    [fetchRoles, workspaceId],
  );

  return {
    roles,
    isLoading,
    error,
    refresh,
  };
};
