import { useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

const VerifyEmail = () => {
  const location = useLocation();
  const _email = location.state?.email || "";
  const navigate = useNavigate();

  const handleResendCode = async () => {
    try {
      const _response = await authClient.sendVerificationEmail({
        email: _email,
        callbackURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/dashboard/`,
        fetchOptions: {
          onSuccess: () => {
            console.log("Doğrulama kodu tekrar gönderildi.");
          },
        },
      });
    } catch (error) {
      console.error("Kod gönderilirken bir hata oluştu:", error);
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
          <div className="relative isolate mb-4 inline-block select-none">
            <span className="font-display pointer-events-none absolute inset-0 bg-[linear-gradient(223deg,_#00d2ff_0%,_#0091ff_104.15%)] bg-clip-text text-2xl font-semibold tracking-tight text-transparent opacity-35 blur-[6px]">
              Cleon AI
            </span>
            <span className="font-display relative bg-[linear-gradient(223deg,_#00d2ff_0%,_#0091ff_104.15%)] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
              Cleon AI
            </span>
          </div>
          <h1 className="font-display text-foreground text-3xl leading-tight font-semibold">
            E-postanızı Doğrulayın
          </h1>
        </div>

        {/* Card */}
        <div className="bg-background border-border shadow-card rounded-2xl border p-8">
          <p className="text-muted-foreground text-md mt-2 max-w-sm text-center font-sans">
            Lütfen <strong className="text-foreground">{_email}</strong>{" "}
            adresine gönderdiğimiz linkten mailinizi doğrulayın ve tekrar giriş
            yapın. <br />
            Eğer maili almadıysanız, aşağıdaki "Yeniden Gönder" butonuna
            tıklayarak doğrulama kodunu tekrar gönderebilirsiniz.
          </p>

          <div className="bg-muted-foreground my-4 h-px w-full" />
          {/* Yeniden Gönder Linki */}
          <div className="text-muted-foreground text-center text-sm">
            Kod gelmedi mi?{" "}
            <Button type="button" onClick={handleResendCode} variant="link">
              Yeniden Gönder
            </Button>
          </div>
          <div className="text-muted-foreground text-center text-sm">
            <Button
              type="button"
              onClick={() => navigate("/auth/login")}
              variant="link"
            >
              Giriş sayfasına dön
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
