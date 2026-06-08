import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, Sparkles } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";
import { workspacesApi } from "~/lib/workspaces-api";
import { useWorkspaceStore } from "~/store/workspace-store";

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
        <div className="bg-brand-light/15 absolute -right-24 -bottom-28 h-[26rem] w-[26rem] rounded-full blur-[130px]" />
      </div>

      <div className="bg-background border-border relative z-10 w-full max-w-xl rounded-3xl border p-8 shadow-2xl md:p-10">
        <div className="mb-8 space-y-3">
          <div className="bg-brand/10 text-brand inline-flex h-10 w-10 items-center justify-center rounded-xl">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-foreground font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Ilk workspace'ini olustur
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Baslamak icin bir workspace adi belirle. Bu adimi tamamladiktan
            sonra dogrudan workspace sayfana yonlendirecegiz.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleCreateWorkspace}>
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="text-sm font-medium">
              Workspace adi
            </Label>
            <div className="relative">
              <Building2 className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="workspace-name"
                value={workspaceName}
                onChange={event => setWorkspaceName(event.target.value)}
                autoFocus
                required
                minLength={3}
                maxLength={80}
                placeholder="Ornek: Satis Operasyon"
                className="h-11 rounded-xl pl-10"
              />
            </div>
          </div>

          {formError ? (
            <p className="border-destructive/30 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm">
              {formError}
            </p>
          ) : null}

          <Button
            type="submit"
            className="h-11 w-full rounded-xl text-sm font-semibold"
            disabled={createWorkspaceMutation.isPending}
          >
            {createWorkspaceMutation.isPending
              ? "Workspace olusturuluyor..."
              : "Workspace olustur"}
          </Button>
        </form>
      </div>
    </div>
  );
}
