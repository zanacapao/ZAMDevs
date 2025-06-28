import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setLoggedIn(true);
        router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E1D8E9] via-[#B6A6CA] to-[#D4BEBE]">
      <Head>
        <title>Reflectly – Your Mood & Journal Companion</title>
      </Head>
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-20 px-4">
        <Image src="/pictures/logo.png" alt="Reflectly Logo" width={80} height={80} />
        <h1 className="text-5xl font-serif font-bold text-[#A09ABC] mt-6 mb-2 drop-shadow">Reflectly</h1>
        <p className="text-xl text-[#6C63A6] mb-6">Your personal mood & journaling companion</p>
        <div className="flex gap-4">
          <Link href="/auth/signup" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white font-bold shadow hover:from-[#B6A6CA] hover:to-[#A09ABC] transition">Sign Up</Link>
          <Link href="/auth/login" className="px-8 py-3 rounded-full bg-white/80 text-[#A09ABC] font-bold shadow border border-[#A09ABC] hover:bg-[#E1D8E9] transition">Log In</Link>
        </div>
      </header>
      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/40 rounded-xl p-6 shadow backdrop-blur-md border border-white/30 flex flex-col items-center">
          <span className="text-4xl mb-2">📅</span>
          <h3 className="text-lg font-bold text-[#A09ABC] mb-1">Mood Calendar</h3>
          <p className="text-[#6C63A6] text-center">Track your daily moods and see your emotional journey at a glance.</p>
        </div>
        <div className="bg-white/40 rounded-xl p-6 shadow backdrop-blur-md border border-white/30 flex flex-col items-center">
          <span className="text-4xl mb-2">📝</span>
          <h3 className="text-lg font-bold text-[#A09ABC] mb-1">Journaling</h3>
          <p className="text-[#6C63A6] text-center">Reflect on your day, set goals, and build a healthy journaling habit.</p>
        </div>
        <div className="bg-white/40 rounded-xl p-6 shadow backdrop-blur-md border border-white/30 flex flex-col items-center">
          <span className="text-4xl mb-2">🏆</span>
          <h3 className="text-lg font-bold text-[#A09ABC] mb-1">Achievements</h3>
          <p className="text-[#6C63A6] text-center">Earn badges and streaks as you grow and stay consistent.</p>
        </div>
      </section>
      {/* Screenshots Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#A09ABC] mb-6 text-center">See Reflectly in Action</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <Image src="/pictures/logo.png" alt="Dashboard Screenshot" width={200} height={200} className="rounded-xl shadow" />
          <Image src="/pictures/google.png" alt="Mood Calendar Screenshot" width={200} height={200} className="rounded-xl shadow" />
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#A09ABC] mb-6 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/40 rounded-xl p-6 shadow backdrop-blur-md border border-white/30">
            <p className="text-[#6C63A6] italic mb-2">“Reflectly helped me build a daily habit and understand my moods better!”</p>
            <div className="text-[#A09ABC] font-bold">– Alex</div>
          </div>
          <div className="bg-white/40 rounded-xl p-6 shadow backdrop-blur-md border border-white/30">
            <p className="text-[#6C63A6] italic mb-2">“The achievements and streaks keep me motivated every day.”</p>
            <div className="text-[#A09ABC] font-bold">– Jamie</div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center text-[#A09ABC] py-8 mt-auto">
        &copy; {new Date().getFullYear()} Reflectly. All rights reserved.
      </footer>
    </div>
  );
}