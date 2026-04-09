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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
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
          <h1 className="font-display text-3xl font-semibold text-[#222222] leading-tight">
            Tekrar Hoş Geldiniz
          </h1>
          <p className="mt-2 text-sm text-[#8e8e93] font-sans">
            Kaldığınız yerden devam edin.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-card p-8">
          <Form onSubmit={signIn} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#222222]"
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
                className="h-11 rounded-xl border-[#e5e7eb] bg-white text-sm text-[#222222] placeholder:text-[#8e8e93] focus:border-[#3b82f6] focus:ring-[#3b82f6]"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-[#222222]"
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
                className="h-11 rounded-xl border-[#e5e7eb] bg-white text-sm text-[#222222] placeholder:text-[#8e8e93] focus:border-[#3b82f6] focus:ring-[#3b82f6]"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isPending || isSessionPending}
              className="h-11 w-full rounded-xl bg-[#181e25] text-white text-sm font-semibold hover:bg-[#2d3748] transition-colors"
            >
              {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>

            <p className="text-center text-sm text-[#8e8e93] font-sans">
              Hesabınız yok mu?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-[#181e25] underline decoration-[#e5e7eb] underline-offset-4 hover:decoration-[#181e25] transition-colors"
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
