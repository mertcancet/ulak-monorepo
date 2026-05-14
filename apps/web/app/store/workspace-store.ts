import { create } from "zustand";

interface WorkspaceState {
  selectedWorkspaceId: string | null;
  setSelectedWorkspaceId: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>(set => ({
  selectedWorkspaceId:
    typeof window !== "undefined"
      ? localStorage.getItem("selected-workspace-id")
      : null,
  setSelectedWorkspaceId: id => {
    set({ selectedWorkspaceId: id });
    localStorage.setItem("selected-workspace-id", id);
  },
}));
