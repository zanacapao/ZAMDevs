import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient"; // Make sure this path is correct

export default function Signup() {
  const [animate, setAnimate] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 400);
    return () => clearTimeout(timer);
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
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
        },
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true); // Show the prompt
  };

  return (
    <div className={`signup-root${animate ? " animate" : ""}`}>
      {/* Left: Animated Circle with Logo and Text */}
      <div className={`circle-left${animate ? " show" : ""}`}>
        <div className="circle-bg" />
        <div className="circle-content">
          <div className="circle-outer">
            <div className="circle-inner">
              <Image
                src="/pictures/logo.png"
                alt="Logo"
                width={70}
                height={70}
                className="circle-logo"
                priority
              />
            </div>
          </div>
          <h2 className="circle-title">Reflectly</h2>
          <p className="circle-desc">
            Welcome! Sign up and start your journey.<br />
          </p>
        </div>
      </div>
      {/* Right: Signup Form */}
      <div className={`signup-right${animate ? " slide-in" : ""}`}>
        {success ? (
          <div className="verify-message" style={{ textAlign: "center" }}>
            Please check your email to verify your account before logging in.
            <br />
            <button
              className="signup-btn"
              style={{ marginTop: 24, width: "70%" }}
              onClick={() => router.push("/auth/login")}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form className="signup-form glass" onSubmit={handleSignup}>
            <h2 className="signup-title">Sign Up</h2>
            <div className="signup-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirm"
              placeholder="Re-enter password"
              required
              value={form.confirm}
              onChange={handleChange}
            />
            <div className="signup-check">
              <input type="checkbox" required id="terms" />
              <label htmlFor="terms">
                I&#39;ve read and agree with Terms of Service and our Privacy Policy
              </label>
            </div>
            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
            {error && <div style={{ color: "#ff4d4f", textAlign: "center", marginTop: 8 }}>{error}</div>}
            <div className="signup-or">or connect with</div>
            <div className="signup-socials">
              <button className="social-btn google-btn" type="button">
                <img src="/pictures/google.png" alt="Google" />
                Google
              </button>
              <button className="social-btn facebook-btn" type="button">
                <img src="/pictures/facebook.png" alt="Facebook" />
                Facebook
              </button>
            </div>
            <div className="signup-login">
              Already have an account?{" "}
              <span className="signup-link" onClick={() => router.push("/auth/login")}>
                Sign in
              </span>
            </div>
          </form>
        )}
      </div>
      <style jsx>{`
        .signup-root {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          background: #f7ebe5;
          overflow: hidden;
          position: relative;
        }
        .circle-left {
          flex: 1.1;
          min-width: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: transparent;
          opacity: 0;
          transform: translateX(-80px) scale(0.96);
          transition: opacity 0.9s cubic-bezier(.77,0,.18,1), transform 0.9s cubic-bezier(.77,0,.18,1);
        }
        .circle-left.show {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        .circle-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 70% 40%, #dac8f1 0%, #b8a6dd 40%, #685e7b 100%);
          opacity: 0.18;
          z-index: 0;
          animation: bgMove 8s infinite alternate cubic-bezier(.77,0,.18,1);
        }
        @keyframes bgMove {
          0% { filter: blur(0px) brightness(1);}
          50% { filter: blur(12px) brightness(1.08);}
          100% { filter: blur(0px) brightness(1);}
        }
        .circle-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 400px;
          padding: 32px;
        }
        .circle-outer {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: conic-gradient(from 90deg, #dac8f1 0% 25%, #b8a6dd 25% 50%, #685e7b 50% 75%, #edddec 75% 100%);
          box-shadow: 0 8px 32px 0 #dac8f1aa;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: cdSpin 7s linear infinite;
          margin-bottom: 18px;
        }
        @keyframes cdSpin {
          100% { transform: rotate(360deg);}
        }
        .circle-inner {
          width: 110px;
          height: 110px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px #dac8f1aa;
        }
        .circle-logo {
          border-radius: 50%;
          object-fit: contain;
        }
        .circle-title {
          color: #685e7b;
          font-family: 'Playfair Display', serif;
          font-size: 2.1rem;
          font-weight: 700;
          margin: 10px 0 4px 0;
          letter-spacing: 2px;
          text-align: center;
          opacity: 0;
          animation: fadeInUp 1s 0.5s forwards cubic-bezier(.77,0,.18,1);
        }
        .circle-desc {
          color: #685e7b;
          font-size: 1.1rem;
          text-align: center;
          margin-bottom: 0;
          opacity: 0;
          animation: fadeInUp 1s 0.8s forwards cubic-bezier(.77,0,.18,1);
        }
        .highlight {
          color: #b8a6dd;
          font-weight: 700;
        }
        .signup-right {
          flex: 1.4;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(80px) scale(0.96);
          transition: opacity 0.9s cubic-bezier(.77,0,.18,1), transform 0.9s cubic-bezier(.77,0,.18,1);
        }
        .signup-right.slide-in {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        .glass {
          background: rgba(255,255,255,0.35);
          box-shadow: 0 8px 32px 0 #dac8f1aa;
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border-radius: 18px;
          border: 1.5px solid #dac8f1;
        }
        .signup-form {
          width: 100%;
          max-width: 370px;
          padding: 38px 32px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 1;
          transform: none;
          animation: fadeInUp 1s 1.1s forwards cubic-bezier(.77,0,.18,1);
        }
        .signup-title {
          color: #685e7b;
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 2px;
        }
        .signup-row {
          display: flex;
          gap: 10px;
        }
        .signup-row input {
          flex: 1;
          min-width: 0;
        }
        .signup-form input[type="text"],
        .signup-form input[type="email"],
        .signup-form input[type="password"] {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1.5px solid #dac8f1;
          background: rgba(255,255,255,0.7);
          color: #685e7b;
          font-size: 1rem;
          margin-bottom: 2px;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .signup-form input:focus {
          border: 1.5px solid #b8a6dd;
          box-shadow: 0 2px 8px #dac8f1aa;
        }
        .signup-check {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #685e7b;
        }
        .signup-btn {
          padding: 12px 0;
          border-radius: 8px;
          border: none;
          background: linear-gradient(90deg, #b8a6dd 0%, #dac8f1 100%);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 12px #dac8f1aa;
          margin-top: 8px;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s;
        }
        .signup-btn:hover {
          background: linear-gradient(90deg, #edddec 0%, #b8a6dd 100%);
          color: #685e7b;
          box-shadow: 0 0 24px 4px #dac8f1bb, 0 2px 8px #dac8f1aa;
          transform: scale(1.05) translateY(-2px);
        }
        .signup-or {
          text-align: center;
          color: #b8a6dd;
          font-size: 1rem;
          margin: 10px 0 4px 0;
          font-weight: 600;
        }
        .signup-socials {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 0;
          border-radius: 8px;
          border: 1.5px solid #dac8f1;
          background: #fff;
          color: #685e7b;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .social-btn:hover {
          background: #dac8f1;
          color: #fff;
          box-shadow: 0 2px 12px #dac8f1aa;
        }
        .google-btn img,
        .facebook-btn img {
          width: 22px;
          height: 22px;
        }
        .signup-login {
          text-align: center;
          margin-top: 10px;
          color: #685e7b;
          font-size: 1rem;
        }
        .signup-link {
          color: #b8a6dd;
          cursor: pointer;
          font-weight: 600;
          margin-left: 4px;
          transition: color 0.2s;
        }
        .signup-link:hover {
          color: #685e7b;
          text-decoration: underline;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @media (max-width: 900px) {
          .signup-root {
            flex-direction: column;
          }
          .circle-left, .signup-right {
            min-width: 0;
            width: 100vw;
            min-height: 320px;
          }
          .circle-content {
            padding: 24px 8px;
          }
          .signup-form {
            padding: 24px 8px 18px 8px;
          }
          .signup-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
}