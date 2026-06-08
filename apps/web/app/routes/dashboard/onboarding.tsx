import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authClient } from "~/lib/auth-client";
import { workspacesApi } from "~/lib/workspaces-api";
import { useWorkspaceStore } from "~/store/workspace-store";
import { WorkspaceOnboardingCard } from "./_components/workspaces/workspace-onboarding-card";

export default function Onboarding() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setSelectedWorkspaceId = useWorkspaceStore(
    state => state.setSelectedWorkspaceId,
  );

  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [workspaceName, setWorkspaceName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { data: workspaces, isPending: isWorkspacesPending } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.listWorkspaces(),
    enabled: !!session,
  });

  const createWorkspaceMutation = useMutation({
    mutationFn: (name: string) =>
      workspacesApi.createWorkspace({
        name,
      }),
    onSuccess: async response => {
      setSelectedWorkspaceId(response.id);
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      navigate("/dashboard", { replace: true });
    },
    onError: error => {
      setFormError(
        error instanceof Error
          ? error.message
          : "Workspace olusturulamadi. Tekrar deneyin.",
      );
    },
  });

  useEffect(() => {
    if (!isSessionPending && !session) {
      navigate("/auth/login", { replace: true });
    }
  }, [isSessionPending, navigate, session]);

  useEffect(() => {
    if (!workspaces?.length) {
      return;
    }

    const firstWorkspaceId = workspaces[0].id;
    setSelectedWorkspaceId(firstWorkspaceId);
    navigate(`/dashboard`, { replace: true });
  }, [navigate, setSelectedWorkspaceId, workspaces]);

  const handleCreateWorkspace = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (createWorkspaceMutation.isPending) {
      return;
    }

    const normalizedName = workspaceName.trim();
    if (normalizedName.length < 3) {
      setFormError("Workspace adi en az 3 karakter olmali.");
      return;
    }

    setFormError(null);
    await createWorkspaceMutation.mutateAsync(normalizedName);
  };

  if (isSessionPending || isWorkspacesPending) {
    return (
      <div className="bg-background grid min-h-screen place-items-center px-6">
        <p className="text-muted-foreground text-sm">Yukleniyor...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-brand/10 absolute -top-28 -left-24 h-96 w-96 rounded-full blur-[120px]" />
        <div className="bg-brand-light/15 absolute -right-24 -bottom-28 h-104 w-104 rounded-full blur-[130px]" />
      </div>

      <WorkspaceOnboardingCard
        workspaceName={workspaceName}
        formError={formError}
        isPending={createWorkspaceMutation.isPending}
        onWorkspaceNameChange={setWorkspaceName}
        onSubmit={handleCreateWorkspace}
      />
    </div>
  );
}
