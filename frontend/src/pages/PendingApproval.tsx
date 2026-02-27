import { Link } from "react-router-dom";

export default function PendingApproval() {
    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center selection:bg-green-100">
            <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
                {/* Decorative Background Icon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -mr-10 -mt-10"></div>

                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-10 shadow-inner relative z-10">
                    🚖
                </div>

                <h1 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Registration <span className="text-green-500">Successful!</span></h1>

                <div className="space-y-4 mb-10 text-left bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-gray-900 font-bold text-lg mb-2">Wait for Admin Approval</p>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        Thank you for joining GoRide! Your professional driver profile has been successfully submitted.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        Our administrative team is now <span className="text-green-600 font-bold italic">reviewing your documents</span> for verification. You will be able to log in and start accepting rides once your profile is approved.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile verification in progress</span>
                    </div>
                </div>

                <p className="text-gray-400 text-xs mb-10 font-bold uppercase tracking-widest">Checking: License, RC, Aadhaar & Vehicle Details</p>

                <Link
                    to="/"
                    className="w-full inline-block bg-green-500 text-emerald-950 py-4 rounded-2xl font-black hover:bg-green-600 transition-all uppercase tracking-widest text-sm shadow-lg shadow-green-500/20"
                >
                    Back to Home
                </Link>

                <p className="mt-6 text-sm text-gray-400">
                    Already approved? <Link to="/login" className="text-green-600 font-bold hover:underline">Log in here</Link>
                </p>
            </div>
        </div>
    );
}
