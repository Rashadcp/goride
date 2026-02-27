import { useState } from "react";
import axios from "axios";
import RealTimeMap from "../components/RealTimeMap";

interface UserHomeProps {
    user: any;
    handleLogout: () => void;
}

export default function UserHome({ user, handleLogout }: UserHomeProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [searchInput, setSearchInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchInput) return;

        setIsSearching(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`
            );
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setDestination([parseFloat(lat), parseFloat(lon)]);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-green-100">
            {/* SIDEBAR */}
            <aside className={`bg-emerald-950 text-white transition-all duration-500 ease-in-out ${isSidebarOpen ? "w-72" : "w-20"} hidden md:flex flex-col p-6 relative overflow-hidden`}>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                {/* Logo */}
                <div className="flex items-center gap-3 mb-12 relative z-10 transition-all">
                    <div className="w-10 h-10 bg-[#00FF85] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF85]/20 shrink-0">
                        <svg className="w-6 h-6 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                        </svg>
                    </div>
                    {isSidebarOpen && <span className="font-bold text-xl tracking-tight">GoRide</span>}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 relative z-10">
                    {[
                        { label: "Home", icon: "🏠", active: true },
                        { label: "My Rides", icon: "🚕", active: false },
                        { label: "Payments", icon: "💳", active: false },
                        { label: "Messages", icon: "💬", active: false, badge: "2" },
                        { label: "Settings", icon: "⚙️", active: false },
                    ].map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${item.active
                                ? "bg-[#00FF85] text-emerald-950 font-bold shadow-lg shadow-[#00FF85]/20"
                                : "hover:bg-white/5 text-emerald-100/60 hover:text-white"
                                }`}
                        >
                            <span className={`text-xl ${item.active ? "" : "grayscale group-hover:grayscale-0"} transition-all`}>{item.icon}</span>
                            {isSidebarOpen && (
                                <div className="flex-1 flex items-center justify-between">
                                    <span className="text-sm tracking-wide">{item.label}</span>
                                    {item.badge && (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-emerald-950">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Profile Area */}
                <div className="pt-6 border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-emerald-800 border-2 border-green-500/30">
                            {user?.profilePhoto ? (
                                <img src={user.profilePhoto} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-bold">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                            )}
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{user?.name || "Passenger"}</p>
                                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Premium User</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors shrink-0"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Sidebar Toggle */}
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-24 bg-[#00FF85] text-emerald-950 w-6 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/20 z-50 hover:scale-110 active:scale-95 transition-all"
                >
                    <span className="text-[10px]">{isSidebarOpen ? "◀" : "▶"}</span>
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* TOP BAR */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 shrink-0">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <form onSubmit={handleSearch} className="relative w-full group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
                                {isSearching ? "⏳" : "🔍"}
                            </span>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Where are you going?"
                                className="w-full bg-gray-50/50 border border-gray-200 py-3 pl-12 pr-4 rounded-2xl text-sm focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium"
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                        <button className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors relative">
                            <span className="text-xl">🔔</span>
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100 mx-2"></div>
                        <div className="hidden sm:block text-right">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Balance</p>
                            <p className="text-lg font-black text-gray-900">$124.50</p>
                        </div>
                        <button className="w-11 h-11 rounded-xl bg-green-500 text-emerald-950 flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-md shadow-green-500/20">
                            <span className="text-lg">＋</span>
                        </button>
                    </div>
                </header>

                {/* SCROLLABLE AREA */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">

                    {/* WELCOME HERO */}
                    <section className="relative bg-emerald-950 rounded-[40px] p-8 lg:p-12 overflow-hidden shadow-2xl">
                        {/* Decorative Glows */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00FF85]/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex-1 space-y-6">
                                <span className="bg-green-500/10 text-[#00FF85] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-500/20">
                                    Ride Smarter
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                                    Hello, <span className="text-green-500">{user?.name?.split(" ")[0] || "User"}!</span> <br />
                                    Ready for a ride?
                                </h1>
                                <p className="text-emerald-100/60 max-w-sm text-base leading-relaxed">
                                    Book your favorite taxi or share a ride with others. Save up to 40% on every journey.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <button className="bg-[#00FF85] hover:bg-green-400 text-emerald-950 px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-500/20 text-sm uppercase tracking-widest active:scale-95">
                                        Book Now
                                    </button>
                                    <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest active:scale-95 backdrop-blur-sm">
                                        Schedule
                                    </button>
                                </div>
                            </div>

                            <div className="w-full max-w-sm relative hidden lg:block">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 blur-3xl rounded-full"></div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-[#00FF85] rounded-2xl flex items-center justify-center text-2xl">🚕</div>
                                            <div>
                                                <p className="text-white font-bold">Standard Taxi</p>
                                                <p className="text-green-500 text-xs font-black uppercase">Available Now</p>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <p className="text-white font-black text-lg">$12.00</p>
                                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Base fare</p>
                                            </div>
                                        </div>
                                        <div className="h-px bg-white/10"></div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-2xl">🤝</div>
                                            <div>
                                                <p className="text-white font-bold">Ride Share</p>
                                                <p className="text-blue-400 text-xs font-black uppercase">2 Seats Left</p>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <p className="text-white font-black text-lg">$4.50</p>
                                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Starting at</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* QUICK ACTIONS & MAP PREVIEW */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quick Destinations */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center justify-between">
                                Quick Places
                                <button className="text-[10px] text-green-600 font-black hover:underline underline-offset-4 uppercase tracking-widest">View All</button>
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Home", addr: "B-24, Emerald Gardens", icon: "🏠", color: "bg-green-100 text-green-600" },
                                    { name: "Office", addr: "Tech Park, Phase 2", icon: "💼", color: "bg-blue-100 text-blue-600" },
                                    { name: "Gym", addr: "Iron Fitness Hub", icon: "💪", color: "bg-purple-100 text-purple-600" },
                                    { name: "Airport", addr: "Terminal 2, Arrivals", icon: "✈️", color: "bg-orange-100 text-orange-600" },
                                ].map((place) => (
                                    <button key={place.name} className="w-full bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/5 transition-all group group">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${place.color}`}>
                                            {place.icon}
                                        </div>
                                        <div className="text-left flex-1 overflow-hidden">
                                            <p className="font-bold text-gray-900 leading-none mb-1">{place.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{place.addr}</p>
                                        </div>
                                        <span className="text-gray-300 group-hover:text-green-500 transition-colors">➜</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 p-2 shadow-xl shadow-gray-200/50 relative overflow-hidden min-h-[400px]">
                            <RealTimeMap destinationCoord={destination} />
                        </div>
                    </div>

                    {/* RECENT TRIPS */}
                    <section className="space-y-6">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Recent Activity</h3>
                        <div className="overflow-x-auto pb-4">
                            <div className="flex gap-6 min-w-max">
                                {[
                                    { id: 1, to: "Airport", date: "Feb 24, 2026", cost: "$18.50", type: "Taxi", status: "Completed" },
                                    { id: 2, to: "Office", date: "Feb 23, 2026", cost: "$4.00", type: "Share", status: "Completed" },
                                    { id: 3, to: "Mall", date: "Feb 21, 2026", cost: "$9.20", type: "Taxi", status: "Cancelled" },
                                ].map((trip) => (
                                    <div key={trip.id} className="w-72 bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${trip.status === "Completed" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                                                {trip.status}
                                            </span>
                                            <span className="text-xs text-gray-400 font-bold">{trip.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${trip.type === "Taxi" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                                                {trip.type === "Taxi" ? "🚕" : "🤝"}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">To</p>
                                                <p className="font-black text-gray-900">{trip.to}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                            <p className="text-2xl font-black text-emerald-950">{trip.cost}</p>
                                            <button className="text-xs font-bold text-gray-400 hover:text-green-600">Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
