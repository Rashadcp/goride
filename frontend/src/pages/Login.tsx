import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import type { LoginData } from "../types";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert("Login failed");
    }
  };

  const handleGoogleLogin = () => {
    // redirect to backend endpoint which starts OAuth flow
    window.location.href = "http://localhost:5000/api/auth/google";
  };


  // check if token returned from backend after Google auth
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white selection:bg-green-100">

      {/* LEFT SIDE (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 relative bg-emerald-950 text-white p-12 lg:p-20 flex-col justify-between overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-16 hover:opacity-80 transition-opacity w-fit">
            <div className="w-10 h-10 bg-[#00FF85] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF85]/20">
              <svg className="w-7 h-7 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                <path d="M15 2h-6v2h6V2z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">GoRide</span>
          </Link>

          <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
            Your next journey <br />
            <span className="text-green-500">starts here.</span>
          </h1>

          <p className="text-emerald-100/60 max-w-md text-lg leading-relaxed">
            Reliable rides for every destination. Connect, commute,
            and explore with ease.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-emerald-100/40">
            © 2026 GoRide Platforms
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-4 sm:px-6 py-12 lg:py-20">

        <div className="w-full max-w-md bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">

          {/* Decorative Sparkle for Mobile */}
          <div className="md:hidden absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full"></div>

          {/* Mobile Logo/Header */}
          <div className="md:hidden text-center mb-10">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-[#00FF85] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF85]/20">
                  <svg className="w-8 h-8 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    <path d="M15 2h-6v2h6V2z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Go<span className="text-green-500">Ride</span>
              </h1>
            </Link>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          </div>

          <div className="hidden md:block mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sign in with your credentials or social account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm font-medium bg-gray-50/30"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm font-medium bg-gray-50/30"
              />
            </div>

            <div className="flex justify-end pt-1">
              <Link to="/forgot-password" summer-note="Connect to OTP flow" className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors uppercase tracking-widest">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-emerald-950 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] text-sm uppercase tracking-widest mt-2"
            >
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all text-sm font-bold text-gray-700"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm font-medium text-gray-500 mt-10">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>

  );
}