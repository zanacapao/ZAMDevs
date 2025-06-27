import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import Head from "next/head";
import { TransitionContext } from "../_app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [showText, setShowText] = useState(false);
  const { showContent } = useContext(TransitionContext);

  useEffect(() => {
    setTimeout(() => setShowText(true), 100);
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
    <div className="relative min-h-screen w-full flex items-center justify-center animate-gradient-bg overflow-hidden">
      <Head>
        <title>Login | Reflectly</title>
      </Head>
      {/* Top left logo and title */}
      <div className="fixed top-6 left-8 flex items-center gap-2 z-30 bg-white/40 px-3 py-1 rounded-full shadow-md backdrop-blur-md">
        <Image src="/pictures/logo.png" alt="Logo" width={28} height={28} />
        <span className="text-[#A09ABC] font-serif text-xl font-bold tracking-wider drop-shadow">Reflectly</span>
      </div>
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
        {/* Dynamic animated logo */}
        <div className="mb-4 animate-float-moon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" fill="#E1D8E9" />
            <rect x="25" y="30" width="30" height="20" rx="6" fill="#A09ABC" />
            <rect x="30" y="35" width="20" height="10" rx="3" fill="#fff" />
            <rect x="35" y="40" width="10" height="3" rx="1.5" fill="#B6A6CA" />
          </svg>
        </div>
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