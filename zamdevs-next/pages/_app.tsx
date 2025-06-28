import '../styles/globals.css';
import type { AppProps } from "next/app";
import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";

export const TransitionContext = createContext<{ showContent: boolean }>({ showContent: true });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setShowOverlay(true);
      setShowContent(false);
    };
    const handleComplete = () => {
      setTimeout(() => {
        setShowOverlay(false);
        setTimeout(() => setShowContent(true), 350);
      }, 400);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <TransitionContext.Provider value={{ showContent }}>
      <div
        className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center transition-opacity duration-500 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: "linear-gradient(120deg, #A09ABC, #B6A6CA, #E1D8E9, #D4BEBE)",
          backgroundSize: "400% 400%",
          animation: showOverlay ? "gradientMove 3s ease infinite" : "none"
        }}
      >
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white/70" />
      </div>
      <Component {...pageProps} />
    </TransitionContext.Provider>
  );
}