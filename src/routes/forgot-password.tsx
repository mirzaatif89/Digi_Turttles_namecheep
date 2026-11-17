import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import logo from "@/assets/logo.png";
import { requestPasswordReset, resetPasswordWithOtp } from "@/lib/auth.functions";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeRequested, setCodeRequested] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const requestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await requestPasswordReset({ data: { email } });
      setCodeRequested(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send a code right now. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await resetPasswordWithOtp({
        data: { email, otp, password, confirmPassword },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccess(true);
    } catch (resetError) {
      setError(
        resetError instanceof Error
          ? resetError.message
          : "Unable to update your password right now. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const resendCode = async () => {
    setBusy(true);
    setError("");
    try {
      await requestPasswordReset({ data: { email } });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send a code right now. Please try again.",
      );
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
            Secure recovery
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold">Reset your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {codeRequested
              ? "Enter the code sent to your email, then choose a new password."
              : "We will send a one-time verification code to your admin email."}
          </p>
        </div>

        {success ? (
          <div className="mt-8 text-center">
            <p className="rounded-xl border border-emerald-400/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-100">
              Password updated. Please sign in with your new password.
            </p>
            <Link
              to="/login"
              search={{ redirect: undefined }}
              className="btn-hero mt-5 w-full justify-center"
            >
              Go to sign in
            </Link>
          </div>
        ) : codeRequested ? (
          <form className="mt-8 space-y-4" onSubmit={updatePassword} noValidate>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Email address</span>
              <input
                value={email}
                disabled
                className="login-input cursor-not-allowed px-3 opacity-70"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Verification code</span>
              <span className="relative block">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="login-input pl-10 tracking-[0.35em]"
                  placeholder="000000"
                />
              </span>
            </label>
            <PasswordInput
              label="New password"
              value={password}
              onChange={setPassword}
              placeholder="At least 8 characters"
            />
            <PasswordInput
              label="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Enter the new password again"
            />
            {error && <RecoveryError message={error} />}
            <button
              disabled={busy}
              className="btn-hero mt-2 w-full justify-center disabled:cursor-wait disabled:opacity-70"
              type="submit"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Update password
            </button>
            <button
              type="button"
              disabled={busy}
              className="w-full text-center text-sm font-semibold text-primary-glow hover:text-primary disabled:opacity-60"
              onClick={() => void resendCode()}
            >
              Send a new code
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={requestCode} noValidate>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Admin email address</span>
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
            {error && <RecoveryError message={error} />}
            <button
              disabled={busy}
              className="btn-hero mt-2 w-full justify-center disabled:cursor-wait disabled:opacity-70"
              type="submit"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Send verification code
            </button>
          </form>
        )}
        <Link
          to="/login"
          search={{ redirect: undefined }}
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary-glow hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </section>
    </main>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <input
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="login-input px-3"
        placeholder={placeholder}
      />
    </label>
  );
}

function RecoveryError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-red-400/30 bg-red-950/30 px-3 py-2.5 text-sm text-red-200"
    >
      {message}
    </p>
  );
}
