import { Building2, Sparkles } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface WorkspaceOnboardingCardProps {
  workspaceName: string;
  formError: string | null;
  isPending: boolean;
  onWorkspaceNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function WorkspaceOnboardingCard({
  workspaceName,
  formError,
  isPending,
  onWorkspaceNameChange,
  onSubmit,
  className,
}: WorkspaceOnboardingCardProps) {
  return (
    <div
      className={cn(
        "bg-background border-border relative z-10 w-full max-w-xl rounded-3xl border p-8 shadow-2xl md:p-10",
        className,
      )}
    >
      <div className="mb-8 space-y-3">
        <div className="bg-brand/10 text-brand inline-flex h-10 w-10 items-center justify-center rounded-xl">
          <Sparkles className="h-5 w-5" />
        </div>
        <h1 className="text-foreground font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Ilk workspace'ini olustur
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Baslamak icin bir workspace adi belirle. Bu adimi tamamladiktan sonra
          dogrudan workspace sayfana yonlendirecegiz.
        </p>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="workspace-name" className="text-sm font-medium">
            Workspace adi
          </Label>
          <div className="relative">
            <Building2 className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="workspace-name"
              value={workspaceName}
              onChange={event => onWorkspaceNameChange(event.target.value)}
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
          disabled={isPending}
        >
          {isPending ? "Workspace olusturuluyor..." : "Workspace olustur"}
        </Button>
      </form>
    </div>
  );
}
