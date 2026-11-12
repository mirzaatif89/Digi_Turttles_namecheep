import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { loginAdmin } from "@/lib/auth.functions";
import { routeAdminSession } from "@/lib/admin.route";
import { sanitizeRedirect } from "@/lib/auth.schemas";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect:
      typeof search["redirect"] === "string" ? sanitizeRedirect(search["redirect"]) : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const destination = sanitizeRedirect(redirect);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    void routeAdminSession().then((session) => {
      if (!cancelled && session) void navigate({ to: "/admin" });
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await loginAdmin({ data: { email, password } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.assign(destination);
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login-page relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="login-glow" aria-hidden />
      <section className="glass glass-strong relative z-10 w-full max-w-md rounded-[2rem] p-7 shadow-2xl sm:p-9">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--foam)] shadow-[var(--shadow-glow)]">
            <img
              src={logo}
              alt="Digi Turtles"
              width={48}
              height={48}
              decoding="async"
              className="h-12 w-12 object-contain"
            />
          </span>
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure admin
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to the Digi Turtles admin</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Email address</span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="login-input pl-10"
                placeholder="you@example.com"
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Password</span>
            <span className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => setCapsLock(event.getModifierState("CapsLock"))}
                onKeyUp={(event) => setCapsLock(event.getModifierState("CapsLock"))}
                className="login-input px-10"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
            {capsLock && (
              <span className="mt-1.5 block text-xs text-amber-300">Caps Lock is on</span>
            )}
          </label>
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-400/30 bg-red-950/30 px-3 py-2.5 text-sm text-red-200"
            >
              {error}
            </p>
          )}
          <button
            disabled={busy}
            className="btn-hero mt-2 w-full justify-center disabled:cursor-wait disabled:opacity-70"
            type="submit"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link
          to="/"
          className="mt-6 block text-center text-sm font-semibold text-primary-glow hover:text-primary"
        >
          ← Back to website
        </Link>
      </section>
    </main>
  );
}
