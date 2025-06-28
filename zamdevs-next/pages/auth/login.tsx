import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import Head from "next/head";
import { TransitionContext } from "../_app";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [showText, setShowText] = useState(false);
  const { showContent } = useContext(TransitionContext);
  const [confirmationMsg, setConfirmationMsg] = useState("");

  useEffect(() => {
    setTimeout(() => setShowText(true), 100);
    // Check for confirmation in URL (Supabase may use hash or query)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('confirmed') === 'true' || window.location.hash.includes('access_token')) {
        setConfirmationMsg("Email confirmed! Please log in.");
        // Optionally, clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  }

  function handleSignup() {
    router.push("/auth/signup");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#E1D8E9] via-[#B6A6CA] to-[#D4BEBE] relative">
      <Head>
        <title>Login | Reflectly</title>
      </Head>
      {/* Logo top left, outside the card */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <Image src="/pictures/logo.png" alt="Reflectly Logo" width={40} height={40} />
        <span className="text-[#A09ABC] font-serif font-bold text-2xl tracking-wide">Reflectly</span>
      </Link>
      {/* Animated Clouds */}
      <div className="absolute left-0 top-24 w-1/2 z-10 animate-cloud-left pointer-events-none">
        <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="60" rx="60" ry="20" fill="#D5CFE1" />
          <ellipse cx="140" cy="50" rx="50" ry="18" fill="#E1D8E9" />
          <ellipse cx="220" cy="65" rx="70" ry="22" fill="#B6A6CA" />
        </svg>
      </div>
      <div className="absolute right-0 top-40 w-1/3 z-10 animate-cloud-right pointer-events-none">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="40" rx="50" ry="15" fill="#E1D8E9" />
          <ellipse cx="120" cy="30" rx="40" ry="12" fill="#D5CFE1" />
        </svg>
      </div>
      {/* Twinkling Stars */}
      <div className="absolute left-1/3 top-1/4 text-[#fff] text-2xl opacity-80 z-0 animate-twinkle">✦</div>
      <div className="absolute right-1/4 bottom-1/3 text-[#fff] text-xl opacity-60 z-0 animate-twinkle">✧</div>
      <div className="absolute left-1/4 bottom-1/4 text-[#fff] text-lg opacity-40 z-0 animate-twinkle" style={{ animationDelay: "1s" }}>✦</div>
      <div className="absolute left-1/2 top-1/6 text-[#fff] text-lg opacity-60 z-0 animate-twinkle" style={{ animationDelay: "2s" }}>✦</div>
      {/* Glassmorphism card */}
      <div className={`relative z-20 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 py-10 bg-white/30 rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {confirmationMsg && (
          <div className="bg-[#D5CFE1] text-[#A09ABC] rounded-lg p-4 text-center font-semibold mb-4 flex items-center justify-between gap-4">
            <span>{confirmationMsg}</span>
            <button className="text-[#A09ABC] text-lg font-bold ml-2" onClick={() => setConfirmationMsg("")}>×</button>
          </div>
        )}
        <h1 className={`font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_8px_rgba(80,60,120,0.25)] mb-4 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Sign In</h1>
        <p className={`mb-8 text-lg text-white/90 text-center drop-shadow-[0_1px_6px_rgba(80,60,120,0.18)] transition-all duration-700 delay-150 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Welcome back! Please log in to continue your journey.</p>
        <form
          className="w-full max-w-xs bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-xl flex flex-col gap-4 z-10"
          onSubmit={handleLogin}
        >
          <label htmlFor="email" className="text-white/90 font-semibold mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="Enter your email"
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
          />
          <label htmlFor="password" className="text-white/90 font-semibold mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
          />
          <div className="flex justify-between items-center text-sm text-purple-100">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-400" /> Remember me
            </label>
            <span className="cursor-pointer hover:underline">Forgot password?</span>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 py-2 rounded-full bg-white/30 text-purple-700 font-semibold shadow hover:bg-white/50 transition border border-white/40"
            >
              Login
            </button>
            <button
              type="button"
              className="flex-1 py-2 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/30 hover:text-purple-700 transition"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}