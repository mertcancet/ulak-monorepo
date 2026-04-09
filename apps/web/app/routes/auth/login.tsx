import { type FormEvent, useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

export default function SignIn() {
  const navigate = useNavigate();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, session]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending || isSessionPending) {
      return;
    }

    setErrorMessage(null);
    setIsPending(true);

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            navigate("/dashboard", { replace: true });
          },
          onError: ({ error }) => {
            const fallbackMessage = "Giris basarisiz. Bilgilerini kontrol et.";
            setErrorMessage(error.message || fallbackMessage);
          },
        },
      );
    } catch (_error) {
      setErrorMessage("Sunucuya baglanirken bir hata olustu.");
    }

    setIsPending(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Subtle brand glow blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 -left-32 w-120 h-120 rounded-full bg-brand/6 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-100 h-100 rounded-full bg-brand-light/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gradient-primary shadow-brand mb-4">
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
          <h1 className="font-display text-3xl font-semibold text-foreground leading-tight">
            Tekrar Hoş Geldiniz
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-sans">
            Kaldığınız yerden devam edin.
          </p>
        </div>

        {/* Card */}
        <div className="bg-background border border-border rounded-2xl shadow-card p-8">
          <Form onSubmit={signIn} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
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
                className="h-11 rounded-xl border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
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
                className="h-11 rounded-xl border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isPending || isSessionPending}
              className="h-11 w-full rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>

            <p className="text-center text-sm text-muted-foreground font-sans">
              Hesabınız yok mu?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground transition-colors"
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
