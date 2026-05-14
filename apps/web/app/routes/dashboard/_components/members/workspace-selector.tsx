import type { Workspace } from "@cleon/shared";
import { Briefcase } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";

export default function WorkspaceSelector({
  selectedWorkspaceId,
  workspacesData,
  newWorkspaceName,
  canCreateWorkspace,
  handleCreateWorkspace,
  setSelectedWorkspaceId,
  setNewWorkspaceName,
}: {
  selectedWorkspaceId: string;
  workspacesData: Workspace[];
  newWorkspaceName: string;
  canCreateWorkspace: boolean;
  handleCreateWorkspace: () => void;
  setSelectedWorkspaceId: (id: string) => void;
  setNewWorkspaceName: (name: string) => void;
}) {
  return (
    <div className="border-border rounded-xl border p-3">
      <div className="mb-3 flex items-center gap-2">
        <Briefcase className="text-muted-foreground size-4" />
        <p className="text-foreground text-sm font-medium">Workspace</p>
      </div>
      <div className="flex flex-col gap-3">
        <Select
          value={selectedWorkspaceId}
          onChange={e => setSelectedWorkspaceId(e.target.value)}
          disabled={workspacesData?.length === 0}
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

        <div className="flex items-center gap-2">
          <Input
            placeholder="Yeni workspace adı"
            value={newWorkspaceName}
            onChange={e => setNewWorkspaceName(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={handleCreateWorkspace}
            disabled={!canCreateWorkspace}
          >
            Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
