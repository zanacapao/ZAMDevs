import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const palette = ["#685e7b", "#b8a6dd", "#dac8f1", "#edddec", "#f7ebe5", "#e7ddd9"];

export default function Welcome() {
  const [showAbout, setShowAbout] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const [aura, setAura] = useState({ x: 0, y: 0, show: false });
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse aura effect
  function handleMouseMove(e: React.MouseEvent) {
    setAura({
      x: e.clientX,
      y: e.clientY,
      show: true,
    });
  }
  function handleMouseLeave() {
    setAura((a) => ({ ...a, show: false }));
  }

  // Cubic bezier transition before routing
  function handleProceed() {
    setStartTransition(true);
    setTimeout(() => {
      router.push("/auth/login");
    }, 700); // match transition duration
  }

  return (
    <div
      className="welcome-bg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Gradient Background */}
      <div className="animated-gradient-bg" />

      {/* Mouse Aura */}
      {aura.show && (
        <div
          className="mouse-aura"
          style={{
            left: aura.x - 150,
            top: aura.y - 150,
          }}
        />
      )}

      {/* Animated Blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

      {/* Welcome Section */}
      <div
        className={`welcome-center${showAbout ? " slide-up" : ""}`}
        onClick={() => !showAbout && setShowAbout(true)}
        style={{ cursor: showAbout ? "default" : "pointer" }}
      >
        <div className="blur-blob" />
        <h1 className="welcome-text animated-text">Welcome to</h1>
        <h2 className="welcome-text reflectly animated-text-delay">Reflectly</h2>
      </div>

      {/* About Us Glass Card */}
      <div
        className={`glass-card-container${showAbout ? " slide-in-up" : ""}${
          startTransition ? " slide-left" : ""
        }`}
        ref={cardRef}
      >
        <div className="glass-card">
          <div className={`logo-img-wrapper${showAbout ? " logo-animate" : ""}`}>
            <Image
              src="/pictures/logo.png"
              alt="Logo"
              className="logo-img"
              width={110}
              height={110}
              priority
            />
          </div>
          <div className="glass-content">
            <h1 className="main-title">About Us</h1>
            <p className="subtitle">
              Reflectly is your companion for self-discovery and emotional wellness.<br />
              Start your journey with us today!
            </p>
            <button
              className="glass-btn"
              onClick={handleProceed}
            >
              Proceed to Login
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .welcome-bg {
          min-height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        /* Animated Gradient Background */
        .animated-gradient-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(120deg, #dac8f1, #b8a6dd, #685e7b, #edddec, #f7ebe5, #e7ddd9, #dac8f1);
          background-size: 200% 200%;
          animation: gradientMove 12s ease-in-out infinite;
          opacity: 0.7;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Mouse Aura */
        .mouse-aura {
          position: fixed;
          width: 300px;
          height: 300px;
          pointer-events: none;
          border-radius: 50%;
          background: radial-gradient(circle, #dac8f1cc 0%, #b8a6dd44 60%, transparent 100%);
          z-index: 10;
          mix-blend-mode: lighten;
          transition: opacity 0.3s;
          opacity: 0.7;
        }
        /* Animated Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          opacity: 0.25;
          filter: blur(60px);
          z-index: 1;
          pointer-events: none;
        }
        .blob1 {
          width: 420px;
          height: 320px;
          background: radial-gradient(circle at 60% 40%, #dac8f1 0%, #b8a6dd 40%, #edddec 80%, #f7ebe5 100%);
          top: 10%;
          left: 8%;
          animation: blobFloat1 12s ease-in-out infinite alternate;
        }
        .blob2 {
          width: 320px;
          height: 220px;
          background: radial-gradient(circle at 60% 40%, #b8a6dd 0%, #685e7b 60%, #dac8f1 100%);
          bottom: 8%;
          right: 10%;
          animation: blobFloat2 14s ease-in-out infinite alternate;
        }
        .blob3 {
          width: 180px;
          height: 140px;
          background: radial-gradient(circle at 60% 40%, #f7ebe5 0%, #e7ddd9 80%);
          top: 60%;
          left: 60%;
          animation: blobFloat3 10s ease-in-out infinite alternate;
        }
        @keyframes blobFloat1 {
          0% { transform: scale(1) translateY(0);}
          50% { transform: scale(1.12) translateY(30px);}
          100% { transform: scale(1) translateY(0);}
        }
        @keyframes blobFloat2 {
          0% { transform: scale(1) translateY(0);}
          50% { transform: scale(0.95) translateY(-40px);}
          100% { transform: scale(1) translateY(0);}
        }
        @keyframes blobFloat3 {
          0% { transform: scale(1) translateX(0);}
          50% { transform: scale(1.18) translateX(40px);}
          100% { transform: scale(1) translateX(0);}
        }

        .welcome-center {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.8s cubic-bezier(.77,0,.18,1), opacity 0.8s;
          z-index: 3;
          background: transparent;
        }
        .welcome-center.slide-up {
          transform: translateY(-100vh);
          opacity: 0;
          pointer-events: none;
        }
        .blur-blob {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 480px;
          height: 360px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at 60% 40%, #dac8f1 0%, #b8a6dd 40%, #edddec 80%, #f7ebe5 100%);
          filter: blur(80px);
          opacity: 0.8;
          z-index: 2;
          animation: blobMove 6s infinite ease-in-out alternate;
        }
        @keyframes blobMove {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg);}
          50% { transform: translate(-52%, -48%) scale(1.08) rotate(8deg);}
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg);}
        }
        .welcome-text {
          position: relative;
          z-index: 3;
          font-size: 3.2rem;
          color: #685e7b;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: 2px;
          text-align: center;
          text-shadow: 0 2px 16px #dac8f1cc;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          animation: fadeInUp 1s forwards cubic-bezier(.77,0,.18,1);
        }
        .welcome-text.reflectly {
          font-size: 3.8rem;
          color: #b8a6dd;
          margin-top: 0.2em;
          letter-spacing: 4px;
          animation: fadeInPop 1.2s forwards cubic-bezier(.77,0,.18,1);
        }
        .animated-text {
          animation-delay: 0.2s;
        }
        .animated-text-delay {
          animation-delay: 0.7s;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeInPop {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.8) rotate(-8deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.08) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        .glass-card-container {
          position: absolute;
          left: 0;
          bottom: -100vh;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: bottom 0.8s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1);
          z-index: 5;
        }
        .glass-card-container.slide-in-up {
          bottom: 0;
          pointer-events: auto;
        }
        .glass-card-container.slide-left {
          transform: translateX(-100vw);
          opacity: 0;
          pointer-events: none;
        }
        .glass-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          background: rgba(255,255,255,0.55);
          box-shadow: 0 8px 32px 0 rgba(104,94,123,0.18);
          backdrop-filter: blur(18px) saturate(180%);
          border-radius: 32px;
          border: 1.5px solid #dac8f1;
          padding: 48px 32px;
          max-width: 520px;
          width: 90%;
          min-height: 320px;
          animation: fadeIn 0.8s;
        }
        .logo-img-wrapper {
          opacity: 0;
          transform: translateY(40px) scale(0.8);
          transition: opacity 0.8s 0.2s, transform 0.8s 0.2s;
        }
        .logo-img-wrapper.logo-animate {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .logo-img {
          width: 110px !important;
          height: 110px !important;
          object-fit: contain;
          margin-right: 32px;
          border-radius: 24px;
          background: #edddec;
          box-shadow: 0 2px 12px #dac8f1aa;
        }
        .glass-content {
          flex: 1;
        }
        .main-title {
          font-size: 2.3rem;
          font-family: 'Playfair Display', serif;
          font-weight: bold;
          color: #685e7b;
          margin-bottom: 12px;
          letter-spacing: 2px;
        }
        .subtitle {
          font-size: 1.1rem;
          color: #685e7b;
          margin-bottom: 32px;
        }
        .glass-btn {
          padding: 12px 32px;
          background: linear-gradient(90deg, #b8a6dd 0%, #dac8f1 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 2px 8px #dac8f1aa;
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .glass-btn:hover {
          background: linear-gradient(90deg, #edddec 0%, #b8a6dd 100%);
          color: #685e7b;
          box-shadow: 0 0 24px 4px #dac8f1bb, 0 2px 8px #dac8f1aa;
          transform: scale(1.05) translateY(-2px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @media (max-width: 900px) {
          .glass-card-container, .glass-card-container.slide-in-up {
            width: 100vw;
            left: 0;
          }
          .glass-card {
            flex-direction: column;
            padding: 32px 12px;
          }
          .logo-img {
            margin: 0 0 18px 0;
          }
        }
      `}</style>
    </div>
  );
}
