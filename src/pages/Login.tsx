import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Starfield } from "@/components/Starfield";
import { Owl } from "@/components/Owl";
import { loadState, saveState } from "@/lib/storage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    const s = loadState();
    saveState({ ...s, email: email.trim(), loggedIn: true });
    navigate("/landing");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield count={90} />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md fade-in-up">
          <div className="flex flex-col items-center mb-8">
            <Owl state="wave" size={88} />
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Welcome to <span className="gradient-text">FocusForge</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to forge your focus.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-7 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@focused.com"
                className="input-field mt-2"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field mt-2"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full mt-2">
              Sign in
            </button>

            <p className="text-xs text-center text-muted-foreground pt-2">
              Local session only — no account required.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
