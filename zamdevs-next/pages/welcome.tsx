import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { TransitionContext } from "./_app";

export default function Welcome() {
  const router = useRouter();
  const [slideUp, setSlideUp] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showText, setShowText] = useState(false);
  const { showContent } = useContext(TransitionContext);

  const handleProceed = () => {
    setShowOverlay(true);
    setTimeout(() => router.push("/about"), 900);
  };

  useEffect(() => {
    setTimeout(() => setShowText(true), 100);
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center animate-gradient-bg overflow-hidden transition-all duration-800 ${slideUp ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      style={{ cursor: "default" }}
    >
      <Head>
        <title>Welcome | Reflectly</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>
      {/* Cinematic overlay transition */}
      <div className={`fixed inset-0 z-50 pointer-events-none transition-transform duration-700 ${showOverlay ? "translate-y-0" : "translate-y-full"}`} style={{background: "linear-gradient(120deg, #A09ABC, #B6A6CA, #E1D8E9, #D4BEBE)", backgroundSize: "200% 200%"}} />
      {/* Animated Moon */}
      <div className="absolute top-12 right-32 md:right-48 z-10 animate-float-moon">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="45" cy="45" rx="40" ry="40" fill="#E1D8E9" />
          <path d="M45 5a40 40 0 1 0 0 80A32 32 0 1 1 45 5z" fill="#B6A6CA" />
        </svg>
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
      {/* Main content with glassmorphism - perfectly centered */}
      <div className={`relative z-20 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 py-12 bg-white/20 rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{minHeight: '340px'}}>
        <h1 className={`font-serif text-[2.5rem] md:text-[4rem] font-bold text-[#fff] drop-shadow-lg mb-4 transition-all duration-700 ${showText && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: 'DM Serif Display, serif' }}>
          Welcome to Reflectly
        </h1>
        <p className={`mb-8 text-lg md:text-xl text-[#E1D8E9] tracking-wide max-w-xl text-center transition-all duration-700 delay-150 ${showText && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: 'DM Serif Display, serif' }}>
          Click the button below to begin your journey
        </p>
        <button
          onClick={handleProceed}
          className={`relative px-10 py-4 rounded-full bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white font-semibold text-xl shadow-lg hover:from-[#B6A6CA] hover:to-[#A09ABC] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#A09ABC]/30 animate-bounce-slow ${slideUp ? 'opacity-0' : 'opacity-100'}`}
        >
          <span className="relative z-10">Click Me</span>
          <span className="absolute left-0 top-0 w-full h-full rounded-full bg-white/10 blur-lg opacity-60 animate-pulse pointer-events-none" />
        </button>
      </div>
    </div>
  );
}

