import type { Role } from "@cleon/shared";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { rolesApi } from "~/lib/roles-api";
import { useWorkspaceStore } from "~/store/workspace-store";

interface RolesState {
  roles: Role[];
  isLoading: boolean;
  error: string | null;
  clearRoles: () => void;
  fetchRoles: (selectedWorkspaceId?: string | null) => Promise<Role[]>;
  refreshRoles: () => Promise<Role[]>;
}

export const useRolesStore = create<RolesState>((set, get) => ({
  roles: [],
  isLoading: false,
  error: null,
  clearRoles: () => {
    set({ roles: [], error: null, isLoading: false });
  },
  fetchRoles: async (selectedWorkspaceId?: string | null) => {
    const nextWorkspaceId =
      selectedWorkspaceId ?? useWorkspaceStore.getState().selectedWorkspaceId;

    if (!nextWorkspaceId) {
      set({ roles: [], isLoading: false, error: null });
      return [];
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const roles = await rolesApi.listRoles();
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
    return get().fetchRoles(useWorkspaceStore.getState().selectedWorkspaceId);
  },
}));

export const useRoles = () => {
  const { selectedWorkspaceId } = useWorkspaceStore();
  const roles = useRolesStore(state => state.roles);
  const isLoading = useRolesStore(state => state.isLoading);
  const error = useRolesStore(state => state.error);
  const clearRoles = useRolesStore(state => state.clearRoles);
  const fetchRoles = useRolesStore(state => state.fetchRoles);

  useEffect(() => {
    if (!selectedWorkspaceId) {
      clearRoles();
      return;
    }

    void fetchRoles(selectedWorkspaceId);
  }, [clearRoles, fetchRoles, selectedWorkspaceId]);

  const refresh = useCallback(
    () => fetchRoles(selectedWorkspaceId),
    [fetchRoles, selectedWorkspaceId],
  );

  return {
    roles,
    isLoading,
    error,
    refresh,
  };
};
