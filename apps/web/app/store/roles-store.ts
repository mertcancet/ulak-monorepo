import type { Role, RolePermissions } from "@cleon/shared";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { rolesApi } from "~/lib/roles-api";
import { useWorkspaceStore } from "~/store/workspace-store";

const SELECTED_USER_ID_STORAGE_KEY = "selected-user-id";
const SELECTED_WORKSPACE_OWNER_STORAGE_KEY = "selected-workspace-owner-id";

const getStorageValue = (key: string): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
};

interface RolesState {
  roles: Role | null;
  permissions: RolePermissions | null;
  isOwner: boolean;
  isLoading: boolean;
  error: string | null;
  clearRoles: () => void;
  fetchRoles: (selectedWorkspaceId?: string | null) => Promise<Role | null>;
  refreshRoles: () => Promise<Role | null>;
}

export const useRolesStore = create<RolesState>((set, get) => ({
  roles: null,
  permissions: null,
  isOwner: false,
  isLoading: false,
  error: null,
  clearRoles: () => {
    set({
      roles: null,
      permissions: null,
      isOwner: false,
      error: null,
      isLoading: false,
    });
  },
  fetchRoles: async (selectedWorkspaceId?: string | null) => {
    const nextWorkspaceId =
      selectedWorkspaceId ?? useWorkspaceStore.getState().selectedWorkspaceId;
    const userId = getStorageValue(SELECTED_USER_ID_STORAGE_KEY);

    if (!nextWorkspaceId || !userId) {
      set({
        roles: null,
        permissions: null,
        isOwner: false,
        isLoading: false,
        error: null,
      });
      return null;
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const { permissions } = await rolesApi.getUserPermissions(
        nextWorkspaceId,
        userId,
      );
      const workspaceOwnerId = getStorageValue(
        SELECTED_WORKSPACE_OWNER_STORAGE_KEY,
      );
      const isOwner = !!workspaceOwnerId && workspaceOwnerId === userId;

      set({
        roles: null,
        permissions,
        isOwner,
        isLoading: false,
      });

      return null;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Roller yuklenemedi.";
      set({
        roles: null,
        error: message,
        permissions: null,
        isOwner: false,
        isLoading: false,
      });
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
  const permissions = useRolesStore(state => state.permissions);
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
    permissions,
    isLoading,
    error,
    refresh,
  };
};
