import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToast("Login successful");

      setTimeout(() => {
        window.location.href = "/controller";
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-3 rounded-xl shadow-lg backdrop-blur-xl">
          ✓ {toast}
        </div>
      )}

      <div className="min-h-screen grid lg:grid-cols-2">

        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">

          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                ▶
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  SyncStream
                </h1>

                <p className="text-xs text-slate-400">
                  Real-Time Video Synchronization
                </p>
              </div>

            </div>
          </div>

          <div className="relative z-10 max-w-xl">

            <p className="text-blue-400 font-medium mb-4">
              REAL-TIME MULTI-DISPLAY SYSTEM
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Control every screen.
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Keep them perfectly synced.
              </span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              SyncStream allows a central controller to manage video
              playback across multiple connected displays in real time.
              Play, pause, seek and switch videos while keeping every
              display synchronized.
            </p>

            <div className="grid grid-cols-3 gap-4">

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-3">
                  ⚡
                </div>

                <h3 className="font-semibold mb-1">
                  Real-Time
                </h3>

                <p className="text-xs text-slate-400">
                  Instant playback updates
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-3">
                  🖥️
                </div>

                <h3 className="font-semibold mb-1">
                  Multi-Display
                </h3>

                <p className="text-xs text-slate-400">
                  Control multiple screens
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-3">
                  🔄
                </div>

                <h3 className="font-semibold mb-1">
                  Auto Sync
                </h3>

                <p className="text-xs text-slate-400">
                  Correct playback drift
                </p>
              </div>

            </div>
          </div>

          <div className="relative z-10">
          </div>

        </div>

        <div className="flex items-center justify-center p-6 bg-slate-900/50">

          <div className="w-full max-w-md">

            <div className="flex items-center gap-3 mb-10 lg:hidden">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                ▶
              </div>

              <div>
                <h1 className="font-bold">
                  SyncStream
                </h1>

                <p className="text-xs text-slate-500">
                  Video Synchronization
                </p>
              </div>

            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">

              <div className="mb-8">

                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl mb-5">
                  🔐
                </div>

                <h2 className="text-3xl font-bold mb-2">
                  Controller Login
                </h2>

                <p className="text-slate-400">
                  Sign in to access the centralized playback controller.
                </p>

              </div>

              <form
                onSubmit={handleLogin}
                className="space-y-5"
                noValidate
              >

                <div>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>

                  <input
                    type="text"
                    placeholder="controller@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setLoginError("");
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border text-white placeholder:text-slate-600 outline-none transition focus:ring-2 ${
                      emailError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />

                  {emailError && (
                    <p className="text-red-400 text-sm mt-2">
                      {emailError}
                    </p>
                  )}

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                        setLoginError("");
                      }}
                      className={`w-full px-4 py-3.5 pr-14 rounded-xl bg-slate-950/70 border text-white placeholder:text-slate-600 outline-none transition focus:ring-2 ${
                        passwordError
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-slate-400 hover:text-white transition"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  {passwordError && (
                    <p className="text-red-400 text-sm mt-2">
                      {passwordError}
                    </p>
                  )}

                </div>

                {loginError && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-blue-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In to Controller"}
                </button>

              </form>

              <div className="mt-6 pt-6 border-t border-white/10">

                <div className="flex items-center gap-2 text-xs text-slate-500">
                </div>

              </div>

            </div>

            <p className="text-center text-xs text-slate-600 mt-6">
              Authorized controllers only • SyncStream
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
