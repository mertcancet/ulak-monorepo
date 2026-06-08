import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { canUpdateWorkspace } from "~/lib/permission-helpers";
import { workspacesApi } from "~/lib/workspaces-api";
import { useRoles } from "~/store/roles-store";
import { useWorkspaceStore } from "~/store/workspace-store";
import DashboardHeader from "./_components/dashboard-header";
import { WorkspaceCreateDialogButton } from "./_components/members/workspace-selector";
import { WorkspaceOnboardingCard } from "./_components/workspaces/workspace-onboarding-card";

export default function WorkspacesPage() {
  const queryClient = useQueryClient();
  const { permissions } = useRoles();
  const selectedWorkspaceId = useWorkspaceStore(
    state => state.selectedWorkspaceId,
  );
  const setSelectedWorkspaceId = useWorkspaceStore(
    state => state.setSelectedWorkspaceId,
  );
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [_formErrorr, setFormError] = useState<string | null>(null);

  const { data: workspacesData = [], isPending } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.listWorkspaces(),
  });

  const canCreateWorkspace = newWorkspaceName.trim().length >= 3;
  const _canUpdateWorkspaceNamee = canUpdateWorkspace(permissions);
  const selectedWorkspace = workspacesData.find(
    workspace => workspace.id === selectedWorkspaceId,
  );

  const createWorkspaceMutation = useMutation({
    mutationFn: (name: string) => workspacesApi.createWorkspace({ name }),
    onSuccess: async data => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setSelectedWorkspaceId(data.id);
      setNewWorkspaceName("");
      setFormError(null);
    },
    onError: error => {
      setFormError(
        error instanceof Error
          ? error.message
          : "Workspace olusturulamadi. Tekrar deneyin.",
      );
    },
  });

  const updateWorkspaceMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      workspacesApi.updateWorkspace(id, { name }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const createWorkspace = async (): Promise<void> => {
    if (!canCreateWorkspace || createWorkspaceMutation.isPending) {
      return;
    }

    setFormError(null);
    await createWorkspaceMutation.mutateAsync(newWorkspaceName.trim());
  };

  const handleCreateWorkspace = (): void => {
    void createWorkspace();
  };

  const handleCreateWorkspaceSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    void createWorkspace();
  };

  const _handleUpdateWorkspacee = (id: string, name: string): void => {
    if (updateWorkspaceMutation.isPending) {
      return;
    }

    updateWorkspaceMutation.mutate({ id, name });
  };

  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <DashboardHeader>
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-foreground font-display text-base font-semibold">
              Workspaces
            </h1>
            <Badge variant="secondary" className="text-xs">
              {isPending ? "Yukleniyor" : `${workspacesData.length} workspace`}
            </Badge>
          </div>
        </div>

        {workspacesData.length > 0 ? (
          <WorkspaceCreateDialogButton
            newWorkspaceName={newWorkspaceName}
            canCreateWorkspace={canCreateWorkspace}
            handleCreateWorkspace={handleCreateWorkspace}
            setNewWorkspaceName={setNewWorkspaceName}
            buttonClassName="gap-2"
          />
        ) : null}
      </DashboardHeader>

      <div className="flex-1 overflow-y-auto">
        {isPending ? null : workspacesData.length === 0 ? (
          <div className="relative mx-auto flex min-h-full items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="bg-brand/10 absolute -top-28 -left-24 h-96 w-96 rounded-full blur-[120px]" />
              <div className="bg-brand-light/15 absolute -right-24 -bottom-28 h-104 w-104 rounded-full blur-[130px]" />
            </div>

            <WorkspaceOnboardingCard
              workspaceName={newWorkspaceName}
              formError={_formErrorr}
              isPending={createWorkspaceMutation.isPending}
              onWorkspaceNameChange={setNewWorkspaceName}
              onSubmit={handleCreateWorkspaceSubmit}
            />
          </div>
        ) : (
          <section className="bg-background w-full p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-foreground flex items-center gap-2 text-sm font-semibold">
                  <Building2 className="size-4" />
                  Workspace Yonetimi
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Tum workspace'leri goruntuleyin, aktif workspace'i degistirin
                  ve izinleriniz varsa adini guncelleyin.
                </p>
              </div>
            </div>

            <div className="bg-card mt-6 overflow-hidden rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60 border-border hover:bg-secondary/60">
                    <TableHead className="pl-4">Workspace</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Owner ID</TableHead>
                    <TableHead className="pr-4 text-right">Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workspacesData.map(workspace => {
                    const isSelected = workspace.id === selectedWorkspace?.id;

                    return (
                      <TableRow
                        key={workspace.id}
                        className="border-border/80 cursor-pointer"
                        data-state={isSelected ? "selected" : undefined}
                        onClick={() => setSelectedWorkspaceId(workspace.id)}
                      >
                        <TableCell className="pl-4">
                          <div>
                            <p className="text-sm font-semibold">
                              {workspace.name}
                            </p>
                            <p className="text-muted-foreground mt-1 text-[11px]">
                              Workspace adi
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">
                          {workspace.id}
                        </TableCell>
                        <TableCell className="text-muted-foreground font-mono text-xs">
                          {workspace.ownerId}
                        </TableCell>
                        <TableCell className="pr-4 text-right">
                          {isSelected ? (
                            <Badge variant="secondary" className="text-[11px]">
                              Secili
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              Sec
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
