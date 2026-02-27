import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await API.post("/auth/forgot-password", { email });
            setStep(2);
            setMessage("OTP sent to your email!");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await API.post("/auth/reset-password", { email, otp, newPassword });
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid OTP or error resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 selection:bg-green-100">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 lg:p-12 border border-gray-100 relative overflow-hidden">
                {/* Decorative Background Icon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -mr-10 -mt-10"></div>

                <div className="flex justify-center mb-6">
                    <Link to="/" className="w-12 h-12 bg-[#00FF85] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF85]/20">
                        <svg className="w-8 h-8 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                            <path d="M15 2h-6v2h6V2z" />
                        </svg>
                    </Link>
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
                    {step === 1 ? "Forgot Password?" : "Reset Password"}
                </h2>
                <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed">
                    {step === 1
                        ? "Enter your email to receive a recovery OTP."
                        : "Enter the OTP sent to your email and your new password."}
                </p>

                {message && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-medium mb-6 border border-green-100 flex items-center gap-2">
                        <span className="text-lg">✅</span> {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-medium mb-6 border border-red-100 flex items-center gap-2">
                        <span className="text-lg">⚠️</span> {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleRequestOTP} className="space-y-6">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm font-medium bg-gray-50/30"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-emerald-950 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] text-sm uppercase tracking-widest disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <input
                            type="text"
                            placeholder="6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            maxLength={6}
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm font-medium bg-gray-50/30 text-center tracking-[10px]"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-sm font-medium bg-gray-50/30"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-emerald-950 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] text-sm uppercase tracking-widest disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-xs font-bold text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest pt-2"
                        >
                            Back to Email
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center text-sm font-medium text-gray-500">
                    Remember your password?{" "}
                    <Link to="/login" className="text-green-600 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
}
