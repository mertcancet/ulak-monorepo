import type React from "react";
import { useEffect, useState } from "react";
import { Form, Link, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function ResetPassword() {
  const [token, setToken] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // URL'den token veya code parametresini alıyoruz
  useEffect(() => {
    const tokenParam = id || "";
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setErrorMessage(
        "Geçersiz veya süresi dolmuş şifre sıfırlama bağlantısı.",
      );
    }
  }, [id]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage("Şifre sıfırlama token'ı bulunamadı.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Şifreler birbiriyle uyuşmuyor.");
      return;
    }

    setIsPending(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      // Buraya backend şifre güncelleme API isteğini ekleyebilirsin
      // Örn: await auth.confirmPasswordReset(token, password);

      setIsSuccess(true);
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Şifre güncellenirken bir hata oluştu.",
      );
    } finally {
      setIsPending(false);
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
            Yeni Şifre Oluştur
          </h1>
          <p className="text-muted-foreground mt-2 font-sans text-sm">
            Lütfen hesabınız için yeni ve güçlü bir şifre belirleyin.
          </p>
        </div>
        <div className="bg-background border-border shadow-card mx-auto w-full max-w-md rounded-2xl border p-8">
          {isSuccess ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400">
                Şifreniz başarıyla güncellendi. Yeni şifrenizle giriş
                yapabilirsiniz.
              </div>
              <Link
                to="/auth/login"
                className="bg-foreground hover:bg-foreground/90 text-background flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors"
              >
                Giriş Yap
              </Link>
            </div>
          ) : (
            <Form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-foreground text-sm font-medium"
                >
                  Yeni Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Yeni şifrenizi girin"
                  required
                  disabled={!token}
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring h-11 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-foreground text-sm font-medium"
                >
                  Yeni Şifre (Tekrar)
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Şifrenizi tekrar girin"
                  required
                  disabled={!token}
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
                disabled={isPending || !token}
                className="bg-foreground hover:bg-foreground/90 text-background h-11 w-full rounded-xl text-sm font-semibold transition-colors"
              >
                {isPending ? "Şifre güncelleniyor..." : "Şifreyi Güncelle"}
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
}
