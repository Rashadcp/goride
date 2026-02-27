import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import UserHome from "./UserHome";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("/auth/me");
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchUser();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    // Check for Driver Approval Status
    if (user?.role === "DRIVER" && user?.driverStatus === "PENDING") {
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center selection:bg-green-100">
                <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background Icon */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -mr-10 -mt-10"></div>

                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-10 shadow-inner relative z-10">
                        ⏳
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Profile Under <span className="text-green-500">Review</span></h1>

                    <div className="space-y-4 mb-10 text-left bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                            Hello <span className="text-green-600 font-bold">{user.name}</span>, thank you for joining GoRide!
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                            Our team is currently verifying your documents (Driving License, RC, Aadhaar Card). This typically takes <span className="font-bold text-gray-900">24-48 hours</span>.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verification in progress</span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs mb-10 font-bold uppercase tracking-widest">We will notify you via email once approved.</p>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-black hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                    >
                        Logout & Exit
                    </button>
                </div>
            </div>
        );
    }

    if (user?.role === "USER") {
        return <UserHome user={user} handleLogout={handleLogout} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center selection:bg-green-100">
            <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-md w-full text-center border border-gray-100 uppercase tracking-tight">
                <div className="w-20 h-20 bg-green-500 text-white rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-lg shadow-green-500/20">
                    🎉
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Welcome to <span className="text-green-500">GoRide!</span></h1>
                <p className="text-gray-500 mb-10 leading-relaxed font-medium">You have successfully logged into your account. We are preparing your {user?.role.toLowerCase()} dashboard.</p>

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black hover:bg-red-100 transition-all uppercase tracking-widest text-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
