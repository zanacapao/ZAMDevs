import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import Head from "next/head";
import { TransitionContext } from "../_app";
import { FiBell } from "react-icons/fi";
import Link from "next/link";

export default function Signup() {
  const [animate, setAnimate] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [showText, setShowText] = useState(false);
  const { showContent } = useContext(TransitionContext);
  const [accountExists, setAccountExists] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 400);
    setTimeout(() => setShowText(true), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
        },
      },
    });
    if (error) {
      if (error.message && error.message.toLowerCase().includes("already registered")) {
        setAccountExists(true);
      }
      setError(error.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#E1D8E9] via-[#B6A6CA] to-[#D4BEBE] relative">
      <Head>
        <title>Sign Up | Reflectly</title>
      </Head>
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
      {/* Logo top left, outside the card */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <Image src="/pictures/logo.png" alt="Reflectly Logo" width={40} height={40} />
        <span className="text-[#A09ABC] font-serif font-bold text-2xl tracking-wide">Reflectly</span>
      </Link>
      <div className={`relative z-20 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 py-10 bg-white/20 rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-700 ${showText && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className={`font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_8px_rgba(80,60,120,0.25)] mb-4 transition-all duration-700 ${showText && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Sign Up</h1>
        <p className={`mb-8 text-lg text-white/90 text-center drop-shadow-[0_1px_6px_rgba(80,60,120,0.18)] transition-all duration-700 delay-150 ${showText && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Create your account and start your journey with Reflectly.</p>
        {accountExists && (
          <div className="flex items-center justify-center gap-2 bg-white/80 border border-[#D5CFE1] rounded-lg p-3 mb-2 text-[#6C63A6] shadow">
            <FiBell className="text-xl" />
            <span>
              This account is already registered. <span className="underline cursor-pointer text-[#A09ABC] font-semibold" onClick={() => router.push("/auth/login")}>Proceed to login</span>.
            </span>
          </div>
        )}
        {success && (
          <div className="bg-[#D5CFE1] text-[#A09ABC] rounded-lg p-4 text-center font-semibold mb-4">
            Please check your email to confirm your account.
          </div>
        )}
        <form className="w-full max-w-md bg-white/30 rounded-xl shadow-lg p-8 flex flex-col gap-4" onSubmit={handleSignup}>
          <label htmlFor="firstName" className="text-white/90 font-semibold mb-1">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            value={form.firstName}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
            disabled={success}
          />
          <label htmlFor="lastName" className="text-white/90 font-semibold mb-1">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            value={form.lastName}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
            disabled={success}
          />
          <label htmlFor="email" className="text-white/90 font-semibold mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
            disabled={success}
          />
          <label htmlFor="password" className="text-white/90 font-semibold mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
            disabled={success}
          />
          <label htmlFor="confirm" className="text-white/90 font-semibold mb-1">Re-enter password</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="Re-enter password"
            required
            value={form.confirm}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
            disabled={success}
          />
          <label htmlFor="phone" className="text-white/90 font-semibold mb-1">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            value={form.phone}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#D5CFE1] bg-white/80 text-[#6C63A6] placeholder-[#A09ABC] focus:outline-none focus:ring-2 focus:ring-[#A09ABC]"
            disabled={success}
          />
          <div className="flex items-center gap-2 text-xs text-[#6C63A6] font-light">
            <input type="checkbox" required id="terms" className="accent-[#A09ABC]" disabled={success} />
            <label htmlFor="terms">
              I&#39;ve read and agree with Terms of Service and our <a href="#" className="underline">Privacy Policy</a>
            </label>
          </div>
          <button className="py-2 rounded-lg bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white font-semibold hover:from-[#B6A6CA] hover:to-[#A09ABC] transition" type="submit" disabled={success || loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          <div className="text-center text-[#B6A6CA] font-normal text-xs my-2">or connect with</div>
          <div className="flex gap-3 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D5CFE1] bg-white text-[#6C63A6] font-semibold hover:bg-[#E1D8E9] hover:text-[#A09ABC] transition" type="button">
              <Image src="/pictures/google.png" alt="Google" width={22} height={22} />
              Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D5CFE1] bg-white text-[#6C63A6] font-semibold hover:bg-[#E1D8E9] hover:text-[#A09ABC] transition" type="button">
              <Image src="/pictures/Facebook.png" alt="Facebook" width={22} height={22} />
              Facebook
            </button>
          </div>
          <div className="text-center text-[#6C63A6] mt-2 text-sm">
            Already have an account?{" "}
            <span className="text-[#A09ABC] font-semibold cursor-pointer hover:underline" onClick={() => router.push("/auth/login")}>Sign in</span>
          </div>
        </form>
      </div>
    </div>
  );
}