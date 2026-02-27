import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function LandingPage() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                }
            });
        }, { threshold: 0.1 });

        const targets = document.querySelectorAll(".reveal");
        targets.forEach((target) => observerRef.current?.observe(target));

        return () => observerRef.current?.disconnect();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-green-100 overflow-x-hidden">
            {/* Custom Reveal Styles */}
            <style>{`
                .reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .reveal-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .delay-100 { transition-delay: 100ms; }
                .delay-200 { transition-delay: 200ms; }
                .delay-300 { transition-delay: 300ms; }
                .delay-400 { transition-delay: 400ms; }
            `}</style>

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <div className="w-10 h-10 bg-[#00FF85] rounded-xl flex items-center justify-center shadow-lg shadow-[#00FF85]/20">
                                <svg className="w-7 h-7 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                    <path d="M15 2h-6v2h6V2z" />
                                </svg>
                            </div>
                            <span className="font-bold text-xl tracking-tight">GoRide</span>
                        </div>

                        {/* Nav Links - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                            <a href="#home" onClick={(e) => scrollToSection(e, "home")} className="hover:text-green-500 transition">Home</a>
                            <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-green-500 transition">About</a>
                            <a href="#how-it-works" onClick={(e) => scrollToSection(e, "how-it-works")} className="hover:text-green-500 transition">How It Works</a>
                            <a href="#help" onClick={(e) => scrollToSection(e, "help")} className="hover:text-green-500 transition">Help</a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="px-6 py-2.5 text-sm font-semibold hover:text-green-500 transition uppercase tracking-wider">
                                Login
                            </Link>
                            <Link to="/register" className="px-6 py-2.5 bg-green-500 text-white rounded-full text-sm font-bold hover:bg-green-600 transition shadow-lg shadow-green-200 uppercase tracking-wider">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section id="home" className="pt-48 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center reveal">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-bold uppercase tracking-widest mb-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Simple & Transparent
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        How <span className="text-green-500">GoRide</span> <br /> Works
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Whether you're looking for a comfortable ride, looking to split the cost, or driving to earn, our platform connects everyone seamlessly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition flex items-center justify-center gap-3 shadow-xl">
                            <span>👤</span> For Passengers
                        </button>
                        <button className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-3">
                            <span>🚖</span> For Drivers
                        </button>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                                More than just a ride, <br />
                                <span className="text-green-500">its a revolution.</span>
                            </h2>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                GoRide was founded with a simple mission: to make transportation accessible, affordable, and sustainable for everyone. We believe in the power of shared journeys to build stronger communities.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mt-1">✓</div>
                                    <p className="font-medium text-gray-700">Safety First Infrastructure</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mt-1">✓</div>
                                    <p className="font-medium text-gray-700">Real-time GPS Tracking</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mt-1">✓</div>
                                    <p className="font-medium text-gray-700">Transparent Pricing Model</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative reveal delay-200">
                            <div className="bg-emerald-950 rounded-[40px] aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000" alt="About GoRide" className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent"></div>
                                <div className="absolute bottom-10 left-10">
                                    <div className="text-3xl font-bold text-white mb-2">10k+</div>
                                    <div className="text-emerald-100/60 text-sm font-medium">Daily Active Users</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION: FOR USERS (How It Works) */}
            <section id="how-it-works" className="bg-emerald-950 text-white py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 reveal">
                        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-emerald-100/60 max-w-lg">
                            Experience the flexibility of booking a private taxi or sharing a ride to save costs. Follow these simple steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 01 */}
                        <div className="group reveal">
                            <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition cursor-default">
                                <span className="text-2xl">👤</span>
                            </div>
                            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Step 01</p>
                            <h3 className="text-xl font-bold mb-3">Register & Login</h3>
                            <p className="text-emerald-100/60 text-sm leading-relaxed">
                                Create a verified profile in seconds using your email or phone number.
                            </p>
                        </div>

                        {/* Step 02 */}
                        <div className="group reveal delay-100">
                            <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition cursor-default">
                                <span className="text-2xl">📍</span>
                            </div>
                            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Step 02</p>
                            <h3 className="text-xl font-bold mb-3">Book a Ride</h3>
                            <p className="text-emerald-100/60 text-sm leading-relaxed">
                                Enter your pickup and destination. See estimated fares instantly.
                            </p>
                        </div>

                        {/* Step 03 - Popular */}
                        <div className="relative p-8 bg-emerald-900/40 rounded-3xl border border-emerald-700/50 reveal delay-200">
                            <div className="absolute -top-3 right-8 px-3 py-1 bg-green-500 text-[10px] font-black uppercase tracking-widest rounded-full text-emerald-950">
                                Popular
                            </div>
                            <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition cursor-default shadow-lg shadow-green-500/20">
                                <span className="text-2xl">🚖</span>
                            </div>
                            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Step 03</p>
                            <h3 className="text-xl font-bold mb-3">Share Your Ride</h3>
                            <p className="text-emerald-100/60 text-sm leading-relaxed">
                                Toggle "Share" to split costs with others going the same way. Save up to 40%.
                            </p>
                        </div>

                        {/* Step 04 */}
                        <div className="group reveal delay-300">
                            <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition cursor-default">
                                <span className="text-2xl">💳</span>
                            </div>
                            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Step 04</p>
                            <h3 className="text-xl font-bold mb-3">Travel & Pay</h3>
                            <p className="text-emerald-100/60 text-sm leading-relaxed">
                                Enjoy the ride with real-time tracking. Pay seamlessly via the app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HELP SECTION (FAQ) */}
            <section id="help" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center reveal">
                    <h2 className="text-4xl font-extrabold mb-12">Frequently Asked Questions</h2>
                    <div className="text-left space-y-6">
                        {[
                            { q: "Is GoRide available in my city?", a: "We are currently operating in major metro areas and expanding daily. Check the app for real-time availability in your location." },
                            { q: "How do I become a driver?", a: "You can click the 'Become a Driver' button, upload your license and vehicle documents, and get verified within 24 hours." },
                            { q: "Are the shared rides safe?", a: "Absolutely. All users are verified, and every trip is monitored in real-time by our safety team." },
                            { q: "What payment methods are supported?", a: "We support all major credit cards, UPI, and our own GoRide Wallet for seamless transactions." },
                        ].map((faq, idx) => (
                            <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:border-green-200 transition-all cursor-default group">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
                                    <span className="text-green-500 font-extrabold text-xl">?</span>
                                    {faq.q}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed pl-6 group-hover:text-gray-700">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-emerald-950 rounded-[40px] py-20 px-8 text-center text-white relative overflow-hidden reveal">
                        {/* Background Glows */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2"></div>

                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to move freely?</h2>
                        <p className="text-emerald-100/60 max-w-xl mx-auto mb-10 leading-relaxed text-lg">
                            Join thousands of passengers and drivers who are already enjoying a smarter way to travel.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-green-500 text-emerald-950 rounded-2xl font-bold hover:bg-green-400 transition shadow-lg shadow-green-500/20 text-center">
                                Get Started
                            </Link>
                            <Link to="/register" className="w-full sm:w-auto px-10 py-4 border-2 border-emerald-800 text-white rounded-2xl font-bold hover:bg-emerald-900 transition text-center">
                                Create an Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#00FF85] rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-950" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                <path d="M15 2h-6v2h6V2z" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg">GoRide</span>
                    </div>

                    <div className="text-gray-400 text-sm">
                        © 2026 GoRide. All rights reserved.
                    </div>

                    <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-green-500 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-green-500 transition">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

