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

interface WorkspaceCreateDialogButtonProps {
  newWorkspaceName: string;
  canCreateWorkspace: boolean;
  handleCreateWorkspace: () => void;
  setNewWorkspaceName: (name: string) => void;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  buttonClassName?: string;
}

export function WorkspaceCreateDialogButton({
  newWorkspaceName,
  canCreateWorkspace,
  handleCreateWorkspace,
  setNewWorkspaceName,
  buttonVariant = "outline",
  buttonClassName,
}: WorkspaceCreateDialogButtonProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateConfirm = () => {
    handleCreateWorkspace();
    setCreateOpen(false);
  };

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
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
          <Button onClick={handleCreateConfirm} disabled={!canCreateWorkspace}>
            Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
  showCreateButton = true,
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
  showCreateButton?: boolean;
}) {
  const selectedWorkspace = workspacesData.find(
    w => w.id === selectedWorkspaceId,
  );
  const [editName, setEditName] = useState("");
  const canSaveEdit = editName.trim().length >= 3;

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
          onChange={event => setSelectedWorkspaceId(event.target.value)}
          disabled={workspacesData.length === 0}
          className="flex-1"
        >
          {workspacesData.length === 0 ? (
            <option value="">Workspace bulunamadi</option>
          ) : null}
          {workspacesData.map(workspace => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </Select>

        {showCreateButton ? (
          <WorkspaceCreateDialogButton
            newWorkspaceName={newWorkspaceName}
            canCreateWorkspace={canCreateWorkspace}
            handleCreateWorkspace={handleCreateWorkspace}
            setNewWorkspaceName={setNewWorkspaceName}
            buttonClassName="shrink-0 gap-2"
          />
        ) : null}
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
