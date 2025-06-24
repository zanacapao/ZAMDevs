import { useState } from "react";
import { useRouter } from "next/router";

export default function Welcome() {
  const [showAbout, setShowAbout] = useState(false);
  const router = useRouter();

  function handleProceed() {
    router.push("/auth/login");
  }

  return (
    <div className="welcome-bg">
      {!showAbout ? (
        <div
          className="welcome-center"
          onClick={() => setShowAbout(true)}
          style={{ cursor: "pointer" }}
        >
          <div className="blur-blob enhanced" />
          <h1 className="welcome-text">Welcome</h1>
        </div>
      ) : (
        <div className="glass-card">
          <h1 className="main-title">About Us</h1>
          <p className="subtitle">
            Reflectly is your companion for self-discovery and emotional wellness.<br />
            Start your journey with us today!
          </p>
          <button className="glass-btn" onClick={handleProceed}>Proceed to Login</button>
        </div>
      )}
      <style jsx>{`
        .welcome-bg {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f3e8ff, #e0c3fc, #f9e2ff);
          overflow: hidden;
          position: relative;
        }

        .welcome-center {
          position: relative;
          width: 400px;
          height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .blur-blob.enhanced {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 480px;
          height: 360px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at 60% 40%, #fbbf24 0%, #a78bfa 40%, #60a5fa 80%, #fff 100%);
          filter: blur(70px);
          opacity: 0.85;
          z-index: 1;
          animation: blobMove 6s infinite ease-in-out alternate;
        }

        @keyframes blobMove {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(-48%, -52%) scale(1.1) rotate(8deg);
          }
          50% {
            transform: translate(-52%, -48%) scale(0.95) rotate(-5deg);
          }
          75% {
            transform: translate(-49%, -51%) scale(1.05) rotate(10deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        .welcome-text {
          position: relative;
          z-index: 2;
          font-size: 2.8rem;
          color: #6d28d9;
          font-weight: 700;
          letter-spacing: 1px;
          text-align: center;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 48px 32px;
          max-width: 400px;
          width: 90vw;
          text-align: center;
          animation: fadeIn 0.8s;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #6d28d9;
          margin-bottom: 16px;
          letter-spacing: 2px;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #444;
          margin-bottom: 32px;
        }

        .glass-btn {
          padding: 12px 32px;
          background: linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(140, 122, 255, 0.15);
          transition: background 0.2s;
        }

        .glass-btn:hover {
          background: linear-gradient(90deg, #b993d6 0%, #8ca6db 100%);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
