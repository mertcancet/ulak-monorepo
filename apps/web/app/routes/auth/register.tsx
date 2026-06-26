import { type FormEvent, useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

export default function Register() {
  const navigate = useNavigate();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, session]);

  const signUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending || isSessionPending) {
      return;
    }

    setErrorMessage(null);
    setIsPending(true);

    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name,
        fetchOptions: {
          onSuccess: () => {
            navigate("/dashboard", { replace: true });
          },
          onError: ({ error }) => {
            const fallbackMessage = "Kayit basarisiz. Bilgilerini kontrol et.";
            setErrorMessage(error.message || fallbackMessage);
          },
        },
      });

      // Fallback: if callback does not run in some client states, redirect on token response.
      const token = (response as { token?: unknown })?.token;
      if (typeof token === "string" && token.length > 0) {
        navigate("/dashboard", { replace: true });
      }
    } catch (_error) {
      setErrorMessage("Sunucuya baglanirken bir hata olustu.");
    } finally {
      setIsPending(false);
    }
  };

  const signUpWithGoogle = async () => {
    if (isPending || isSessionPending || isGooglePending) {
      return;
    }

    setErrorMessage(null);
    setIsGooglePending(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        fetchOptions: {
          onError: ({ error }) => {
            const fallbackMessage = "Google ile kayit basarisiz.";
            setErrorMessage(error.message || fallbackMessage);
          },
        },
      });
    } catch (_error) {
      setErrorMessage("Google ile kayit baslatilirken bir hata olustu.");
      setIsGooglePending(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
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
          <div className="relative isolate inline-block select-none">
            {/* Gölgeyi Oluşturan Arka Plan Katmanı (Parlaklığı Azaltıldı) */}
            <span className="font-display pointer-events-none absolute inset-0 bg-[linear-gradient(223deg,_#00d2ff_0%,_#0091ff_104.15%)] bg-clip-text text-2xl font-semibold tracking-tight text-transparent opacity-35 blur-[6px]">
              {/* Parlaklık Azaltma: blur-[12px] -> blur-[6px] ve opacity-70 -> opacity-35 yapıldı */}
              Cleon AI
            </span>

            {/* Net ve Renkli Gözüken Ön Katman */}
            <span className="font-display relative bg-[linear-gradient(223deg,_#00d2ff_0%,_#0091ff_104.15%)] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
              Cleon AI
            </span>
          </div>
          <h1 className="font-display text-foreground text-3xl leading-tight font-semibold">
            Hesap Oluşturun
          </h1>
          <p className="text-muted-foreground mt-2 font-sans text-sm">
            Dakikalar içinde AI call flow'larınızı oluşturmaya başlayın.
          </p>
        </div>

        {/* Card */}
        <div className="bg-background border-border shadow-card rounded-2xl border p-8">
          <Form onSubmit={signUp} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-foreground text-sm font-medium"
              >
                Ad Soyad
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ahmet Yılmaz"
                autoComplete="name"
                required
                className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring h-11 rounded-xl text-sm"
              />
            </div>

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
                placeholder="Güçlü bir şifre oluşturun"
                autoComplete="new-password"
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
              {isPending ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
            </Button>

            <div className="flex items-center gap-3">
              <div className="bg-border h-px flex-1" />
              <span className="text-muted-foreground text-xs">veya</span>
              <div className="bg-border h-px flex-1" />
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isPending || isSessionPending || isGooglePending}
              onClick={signUpWithGoogle}
              className="h-11 w-full rounded-xl text-sm font-semibold"
            >
              {isGooglePending
                ? "Google yonlendiriliyor..."
                : "Google ile Kayıt Ol"}
            </Button>

            <p className="text-muted-foreground text-center font-sans text-sm">
              Zaten hesabınız var mı?{" "}
              <Link
                to="/auth/login"
                className="text-foreground decoration-border hover:decoration-foreground font-semibold underline underline-offset-4 transition-colors"
              >
                Giriş Yapın
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
