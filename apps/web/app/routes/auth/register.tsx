import { type FormEvent, useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
      await authClient.signUp.email(
        {
          email,
          password,
          name,
        },
        {
          onSuccess: () => {
            navigate("/dashboard", { replace: true });
          },
          onError: ({ error }) => {
            const fallbackMessage = "Kayit basarisiz. Bilgilerini kontrol et.";
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
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eef2ff_35%,#e2e8f0_100%)] px-4 py-8 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="floating-orb floating-orb-1" />
        <span className="floating-orb floating-orb-2" />
        <span className="floating-orb floating-orb-3" />
        <span className="floating-orb floating-orb-4" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <Card className="w-full border-white/40 bg-white/55 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.6)] backdrop-blur-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Start building your AI call flows in minutes.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form onSubmit={signUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="h-11 rounded-xl border-white/70 bg-white/80 text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                  required
                  className="h-11 rounded-xl border-white/70 bg-white/80 text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  autoComplete="new-password"
                  required
                  className="h-11 rounded-xl border-white/70 bg-white/80 text-sm placeholder:text-slate-400"
                />
              </div>

              {errorMessage ? (
                <p className="rounded-xl border border-red-200/80 bg-red-50/70 px-3 py-2 text-sm text-red-700">
                  {errorMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={isPending || isSessionPending}
                size="lg"
                className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
                >
                  Sign in
                </Link>
              </p>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
