import type { Workspace } from "@cleon/shared";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select } from "~/components/ui/select";

export default function WorkspaceSelector({
  selectedWorkspaceId,
  workspacesData,
  newWorkspaceName,
  canCreateWorkspace,
  canUpdateWorkspace,
  handleCreateWorkspace,
  handleUpdateWorkspace,
  setSelectedWorkspaceId,
  setNewWorkspaceName,
}: {
  selectedWorkspaceId: string;
  workspacesData: Workspace[];
  newWorkspaceName: string;
  canCreateWorkspace: boolean;
  canUpdateWorkspace: boolean;
  handleCreateWorkspace: () => void;
  handleUpdateWorkspace: (id: string, name: string) => void;
  setSelectedWorkspaceId: (id: string) => void;
  setNewWorkspaceName: (name: string) => void;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const selectedWorkspace = workspacesData.find(
    w => w.id === selectedWorkspaceId,
  );
  const [editName, setEditName] = useState("");
  const canSaveEdit = editName.trim().length >= 3;

  const handleCreateConfirm = () => {
    handleCreateWorkspace();
    setCreateOpen(false);
  };

  const handleEditSave = () => {
    if (!canSaveEdit || !selectedWorkspaceId) {
      return;
    }
    handleUpdateWorkspace(selectedWorkspaceId, editName.trim());
    setEditName("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Select
          value={selectedWorkspaceId}
          onChange={e => setSelectedWorkspaceId(e.target.value)}
          disabled={workspacesData?.length === 0}
          className="flex-1"
        >
          {workspacesData?.length === 0 && (
            <option value="">Workspace bulunamadı</option>
          )}
          {workspacesData?.map(workspace => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </Select>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="shrink-0 gap-2">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Workspace Oluştur</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Yeni Workspace Oluştur</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-2">
              <Label htmlFor="new-workspace-name">Workspace Adı</Label>
              <Input
                id="new-workspace-name"
                placeholder="Workspace adı (min. 3 karakter)"
                value={newWorkspaceName}
                onChange={e => setNewWorkspaceName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && canCreateWorkspace) {
                    handleCreateConfirm();
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setCreateOpen(false)}>
                İptal
              </Button>
              <Button
                onClick={handleCreateConfirm}
                disabled={!canCreateWorkspace}
              >
                Oluştur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {canUpdateWorkspace && selectedWorkspace ? (
        <div className="flex items-center gap-2">
          <Input
            placeholder={selectedWorkspace.name}
            value={editName}
            onChange={e => setEditName(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && canSaveEdit) {
                handleEditSave();
              }
            }}
          />
          <Button
            variant="outline"
            onClick={handleEditSave}
            disabled={!canSaveEdit}
          >
            Kaydet
          </Button>
        </div>
      ) : null}
    </div>
  );
}
