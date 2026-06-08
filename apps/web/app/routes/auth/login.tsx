import { useQuery } from "@tanstack/react-query";
import { type FormEvent, useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";
import { workspacesApi } from "~/lib/workspaces-api";

export default function SignIn() {
  const navigate = useNavigate();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const { data: workspaces = [], isPending: isWorkspacesPending } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspacesApi.listWorkspaces(),
    enabled: !!session,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!session || isWorkspacesPending) {
      return;
    }

    navigate(workspaces.length > 0 ? "/dashboard" : "/dashboard/onboarding", {
      replace: true,
    });
  }, [isWorkspacesPending, navigate, session, workspaces.length]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending || isSessionPending) {
      return;
    }

    setErrorMessage(null);
    setIsPending(true);

    try {
      const response = await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onError: ({ error }) => {
            const fallbackMessage = "Giris basarisiz. Bilgilerini kontrol et.";
            setErrorMessage(error.message || fallbackMessage);
          },
        },
      });

      // Fallback: if callbacks are skipped in some client states, session/query effects still drive navigation.
      void response;
    } catch (_error) {
      setErrorMessage("Sunucuya baglanirken bir hata olustu.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      {/* Subtle brand glow blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="bg-brand/6 absolute -top-32 -left-32 h-120 w-120 rounded-full blur-[100px]" />
        <div className="bg-brand-light/8 absolute -right-32 -bottom-32 h-100 w-100 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="gradient-primary shadow-brand mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="font-display text-foreground text-3xl leading-tight font-semibold">
            Tekrar Hoş Geldiniz
          </h1>
          <p className="text-muted-foreground mt-2 font-sans text-sm">
            Kaldığınız yerden devam edin.
          </p>
        </div>

        {/* Card */}
        <div className="bg-background border-border shadow-card rounded-2xl border p-8">
          <Form onSubmit={signIn} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                E-posta
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="isim@sirket.com"
                autoComplete="email"
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring h-11 rounded-xl text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-foreground text-sm font-medium"
              >
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                autoComplete="current-password"
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring h-11 rounded-xl text-sm"
              />
            </div>

            {errorMessage ? (
              <p className="border-destructive/30 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm">
                {errorMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isPending || isSessionPending}
              className="bg-foreground hover:bg-foreground/90 text-background h-11 w-full rounded-xl text-sm font-semibold transition-colors"
            >
              {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>

            <p className="text-muted-foreground text-center font-sans text-sm">
              Hesabınız yok mu?{" "}
              <Link
                to="/auth/register"
                className="text-foreground decoration-border hover:decoration-foreground font-semibold underline underline-offset-4 transition-colors"
              >
                Hesap Oluşturun
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
