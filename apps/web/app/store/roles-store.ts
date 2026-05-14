import type { Role } from "@cleon/shared";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { rolesApi } from "~/lib/roles-api";
import { useWorkspaceStore } from "~/store/workspace-store";

interface RolesState {
  roles: Role | null;
  isLoading: boolean;
  error: string | null;
  clearRoles: () => void;
  fetchRoles: (selectedWorkspaceId?: string | null) => Promise<Role | null>;
  refreshRoles: () => Promise<Role | null>;
}

export const useRolesStore = create<RolesState>((set, get) => ({
  roles: null,
  isLoading: false,
  error: null,
  clearRoles: () => {
    set({ roles: null, error: null, isLoading: false });
  },
  fetchRoles: async (selectedWorkspaceId?: string | null) => {
    const nextWorkspaceId =
      selectedWorkspaceId ?? useWorkspaceStore.getState().selectedWorkspaceId;

    if (!nextWorkspaceId) {
      set({ roles: null, isLoading: false, error: null });
      return null;
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const roles = await rolesApi.listRoles();
      const filteredRoles = roles.filter(
        role => role.workspaceId === nextWorkspaceId,
      );
      const selectedRole =
        filteredRoles.find(
          role =>
            role.permissions.workspace?.includes("*") &&
            role.permissions.role?.includes("*") &&
            role.permissions.agent?.includes("*") &&
            role.permissions.tool?.includes("*"),
        ) ??
        filteredRoles[0] ??
        null;

      set({ roles: selectedRole, isLoading: false });

      return selectedRole;
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
    roleId: roles?.id ?? null,
    permissions: roles?.permissions ?? null,
    isLoading,
    error,
    refresh,
  };
};
