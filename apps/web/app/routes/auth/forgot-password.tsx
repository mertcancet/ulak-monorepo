import { useState } from "react";
import { Form, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      // Buraya şifre sıfırlama API isteğini ekleyebilirsin
      // Örn: await auth.sendPasswordResetEmail(email);

      const _frontendBaseUrl = import.meta.env.VITE_FRONTEND_BASE_URL;

      await authClient.requestPasswordReset({
        email,
        redirectTo: `${_frontendBaseUrl}/auth/reset-password/`,
        fetchOptions: {
          onSuccess: () => {
            console.log("Şifre sıfırlama bağlantısı gönderildi.");
          },
        },
      });
      setIsSuccess(true);
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Bir hata oluştu. Lütfen tekrar deneyin.",
      );
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
            Şifremi Unuttum
          </h1>
          <p className="text-muted-foreground mt-2 font-sans text-sm">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı
            gönderelim.{" "}
          </p>
        </div>

        {/* Card */}
        <div className="bg-background border-border shadow-card mx-auto w-full max-w-md rounded-2xl border p-8">
          {isSuccess ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400">
                Şifre sıfırlama bağlantısı başarıyla e-posta adresinize
                gönderildi.
              </div>
              <Link
                to="/auth/login"
                className="bg-foreground hover:bg-foreground/90 text-background flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors"
              >
                Giriş Ekranına Dön
              </Link>
            </div>
          ) : (
            <Form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-foreground text-sm font-medium"
                >
                  E-posta Adresi
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

              {errorMessage ? (
                <p className="border-destructive/30 bg-destructive/10 text-destructive rounded-xl border px-4 py-3 text-sm">
                  {errorMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={isPending}
                className="bg-foreground hover:bg-foreground/90 text-background h-11 w-full rounded-xl text-sm font-semibold transition-colors"
              >
                {isPending
                  ? "Bağlantı gönderiliyor..."
                  : "Sıfırlama Bağlantısı Gönder"}
              </Button>

              <p className="text-muted-foreground text-center font-sans text-sm">
                <Link
                  to="/auth/login"
                  className="text-foreground decoration-border hover:decoration-foreground font-semibold underline underline-offset-4 transition-colors"
                >
                  Giriş Ekranına Geri Dön
                </Link>
              </p>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
