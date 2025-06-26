import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(true);
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
    <div className={`login-root${show ? " login-in" : ""}`}>
      {/* Left: Login Form */}
      <div className="login-left">
        <div className="login-logo-bar">
          <div className="login-logo-anim">
            <Image src="/pictures/logo.png" alt="Logo" width={40} height={40} />
            <span className="reflectly-text">Reflectly</span>
          </div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div className="login-options">
            <label className="remember">
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>
          <div className="login-btns">
            <button type="submit" className="login-btn">Login</button>
            <button type="button" className="signup-btn" onClick={handleSignup}>Sign up</button>
          </div>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
      {/* Right: Logo/Illustration */}
      <div className="login-right">
        <div className="big-logo">
          <Image src="/pictures/logo.png" alt="Logo" width={180} height={180} />
        </div>
      </div>
      <style jsx>{`
        .login-root {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          background: #f7ebe5;
          overflow: hidden;
          position: relative;
          opacity: 0;
          transform: translateX(100vw);
          transition: opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1);
        }
        .login-root.login-in {
          opacity: 1;
          transform: translateX(0);
        }
        .login-left {
          flex: 1.1;
          background: linear-gradient(135deg, #685e7b 0%, #b8a6dd 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 48px 32px;
          min-width: 320px;
          position: relative;
          overflow: hidden;
        }
        .login-logo-bar {
          position: absolute;
          top: 32px;
          left: 32px;
        }
        .login-logo-anim {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeLogo 1s 0.2s forwards cubic-bezier(.77,0,.18,1);
        }
        @keyframes fadeLogo {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .reflectly-text {
          color: #fff;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-shadow: 0 2px 12px #dac8f1cc;
          opacity: 0.92;
        }
        .login-left::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, #dac8f1 0%, #b8a6dd 40%, #685e7b 100%);
          opacity: 0.18;
          z-index: 0;
          animation: leftBgAnim 8s infinite alternate cubic-bezier(.77,0,.18,1);
        }
        @keyframes leftBgAnim {
          0% { filter: blur(0px) brightness(1);}
          50% { filter: blur(12px) brightness(1.08);}
          100% { filter: blur(0px) brightness(1);}
        }
        .login-form {
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1;
        }
        .login-form label {
          color: #fff;
          font-size: 1rem;
          margin-bottom: 2px;
        }
        .login-form input[type="email"],
        .login-form input[type="password"] {
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1rem;
          margin-bottom: 6px;
          outline: none;
          transition: background 0.2s;
        }
        .login-form input[type="email"]:focus,
        .login-form input[type="password"]:focus {
          background: rgba(255,255,255,0.25);
        }
        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
          color: #eee;
          margin-bottom: 8px;
        }
        .remember input {
          margin-right: 4px;
        }
        .forgot {
          cursor: pointer;
          color: #dac8f1;
          font-size: 0.95em;
        }
        .login-btns {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .login-btn, .signup-btn {
          flex: 1;
          padding: 10px 0;
          border-radius: 24px;
          border: none;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s;
        }
        .login-btn {
          background: linear-gradient(90deg, #b8a6dd 0%, #dac8f1 100%);
          color: #fff;
          box-shadow: 0 2px 12px #dac8f1aa;
          position: relative;
          overflow: hidden;
        }
        .login-btn:hover {
          background: linear-gradient(90deg, #edddec 0%, #b8a6dd 100%);
          color: #685e7b;
          box-shadow: 0 0 24px 4px #dac8f1bb, 0 2px 8px #dac8f1aa;
          transform: scale(1.05) translateY(-2px);
        }
        .signup-btn {
          background: transparent;
          color: #fff;
          border: 2px solid #dac8f1;
        }
        .signup-btn:hover {
          background: #dac8f1;
          color: #685e7b;
        }
        .login-error {
          color: #ff4d4f;
          margin-top: 10px;
          text-align: center;
        }
        .login-right {
          flex: 1.5;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .big-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 220px;
          height: 220px;
          background: linear-gradient(135deg, #dac8f1 0%, #b8a6dd 100%);
          border-radius: 50%;
          box-shadow: 0 8px 32px 0 #dac8f1aa;
          margin: auto;
          animation: logoPop 1.2s cubic-bezier(.77,0,.18,1);
        }
        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0.7);}
          60% { opacity: 1; transform: scale(1.08);}
          100% { opacity: 1; transform: scale(1);}
        }
        @media (max-width: 900px) {
          .login-root {
            flex-direction: column;
          }
          .login-left, .login-right {
            min-width: 0;
            width: 100vw;
            min-height: 320px;
          }
          .login-right {
            min-height: 180px;
          }
          .login-logo-bar {
            position: static;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}