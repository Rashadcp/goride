import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";
import type { RegisterData } from "../types";

interface DriverExtras {
  numberPlate: string;
  license: File | null;
  rc: File | null;
  aadhaar: File | null;
  vehiclePhoto: File | null;
  profilePhoto: File | null;
}

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileInputRef = useRef<HTMLInputElement>(null);

  // check if token returned from backend after Google auth
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  const [preview, setPreview] = useState<string | null>(null);


  const [fileNames, setFileNames] = useState({
    license: "",
    rc: "",
    aadhaar: "",
    vehiclePhoto: "",
  });

  const [form, setForm] = useState<
    RegisterData & DriverExtras
  >({
    name: "",
    email: "",
    password: "",
    role: "USER",
    numberPlate: "",
    license: null,
    rc: null,
    aadhaar: null,
    vehiclePhoto: null,
    profilePhoto: null,
  });

  /* ===========================
     Handlers
  ============================ */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRole = (role: "USER" | "DRIVER") => {
    setForm({ ...form, role });
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setForm({ ...form, profilePhoto: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    setForm({ ...form, [e.target.name]: file });

    setFileNames({
      ...fileNames,
      [e.target.name]: file.name,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

    try {
      await API.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (form.role === "DRIVER") {
        navigate("/pending-approval");
      } else {
        navigate("/login");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  /* ===========================
     UI
  ============================ */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 py-12 lg:py-20 selection:bg-green-100">

      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">

        {/* LEFT PANEL */}
        <div className="hidden md:flex md:w-1/2 relative bg-emerald-950 text-white p-12 lg:p-16 flex-col justify-between overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 bg-[#00FF85] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF85]/20">
                <svg className="w-7 h-7 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  <path d="M15 2h-6v2h6V2z" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight">GoRide</span>
            </Link>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Join the <br />
              <span className="text-green-500">smarter way</span> <br />
              to travel
            </h1>

            <p className="text-emerald-100/60 max-w-md text-base leading-relaxed">
              Experience the flexibility of ride-sharing and professional taxi services. Your safe journey starts with a simple registration.
            </p>
          </div>

          <div className="relative z-10">
            <p className="text-sm text-emerald-100/40">
              © 2026 GoRide Platforms Inc.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 bg-white p-8 lg:p-16 overflow-y-auto max-h-[90vh] md:max-h-none">

          {/* Mobile Header */}
          <div className="md:hidden mb-10 text-center">
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
            <p className="text-gray-500 text-sm mt-2">
              Create your account to get started
            </p>
          </div>

          <div className="hidden md:block mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sign up today and start your journey with GoRide.
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => handleRole("USER")}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${form.role === "USER"
                ? "border-green-500 bg-green-50/50 shadow-sm"
                : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                }`}
            >
              <span className={`text-xl ${form.role === "USER" ? "scale-110" : "grayscale opacity-50"} transition-all`}>👤</span>
              <span className={`text-sm font-bold ${form.role === "USER" ? "text-green-700" : "text-gray-500"}`}>Passenger</span>
            </button>

            <button
              type="button"
              onClick={() => handleRole("DRIVER")}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${form.role === "DRIVER"
                ? "border-green-500 bg-green-50/50 shadow-sm"
                : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                }`}
            >
              <span className={`text-xl ${form.role === "DRIVER" ? "scale-110" : "grayscale opacity-50"} transition-all`}>🚖</span>
              <span className={`text-sm font-bold ${form.role === "DRIVER" ? "text-green-700" : "text-gray-500"}`}>Taxi Driver</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Profile Upload */}
            <div className="flex items-center gap-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
              <div
                onClick={() => profileInputRef.current?.click()}
                className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-300 cursor-pointer flex items-center justify-center overflow-hidden bg-white hover:border-green-500 transition-all group shadow-sm"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl text-gray-400 group-hover:text-green-500 group-hover:scale-125 transition-all text-center">＋</span>
                )}
              </div>

              <div>
                <p className="font-bold text-gray-800 text-sm">
                  Profile Photo
                </p>
                <p className="text-xs text-gray-500">
                  Add a photo for verification
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                onChange={handleProfileChange}
                className="hidden"
              />
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm bg-gray-50/30 font-medium"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm bg-gray-50/30 font-medium"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm bg-gray-50/30 font-medium"
                />
              </div>
            </div>

            {/* DRIVER SECTION */}
            {form.role === "DRIVER" && (
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-6">
                <h3 className="font-bold text-gray-900 text-sm">
                  Verification Documents
                </h3>

                {[
                  { label: "Driving License", name: "license", icon: "📄" },
                  { label: "Vehicle RC", name: "rc", icon: "📜" },
                  { label: "Aadhaar Card", name: "aadhaar", icon: "🆔" },
                  { label: "Vehicle Photo", name: "vehiclePhoto", icon: "📸" },
                ].map((item) => (
                  <div key={item.name} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                      {item.label}
                    </label>

                    <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50/30 transition-all bg-white text-center group">
                      <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                      <p className="text-xs font-medium text-gray-600">
                        {fileNames[item.name as keyof typeof fileNames] || "Click to upload"}
                      </p>

                      <input
                        type="file"
                        name={item.name}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                    Number Plate
                  </label>
                  <input
                    type="text"
                    name="numberPlate"
                    placeholder="e.g. KL 01 AB 1234"
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm bg-white font-medium uppercase tracking-widest"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-emerald-950 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] text-sm uppercase tracking-widest"
            >
              Create Account
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
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
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
            Already a member?{" "}
            <Link to="/login" className="text-green-600 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
              Log in here
            </Link>
          </p>

        </div>
      </div>
    </div>

  );
}