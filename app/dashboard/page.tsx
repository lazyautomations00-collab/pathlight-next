"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../components/Logo";
import { LogOut, User, BookOpen, Calendar, Bell, Search, Settings } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            router.push("/signin");
            return;
        }

        setUser(JSON.parse(userData));
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/signin");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-20 hidden lg:block">
                <div className="p-6">
                    <Logo className="w-32" />
                </div>

                <nav className="px-4 space-y-2 mt-4">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-xl font-medium">
                        <User size={20} />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                        <BookOpen size={20} />
                        My Courses
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                        <Calendar size={20} />
                        Schedule
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                        <Bell size={20} />
                        Notifications
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                        <Settings size={20} />
                        Settings
                    </a>
                </nav>

                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors w-full"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-slate-800">Overview</h1>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none w-64"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                {user?.name?.[0] || "U"}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-slate-700">{user?.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {user?.name}! 👋</h2>
                        <p className="text-slate-500">Here's what's happening with your account today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">4</h3>
                            <p className="text-slate-500 text-sm">Active Courses</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">12</h3>
                            <p className="text-slate-500 text-sm">Upcoming Sessions</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                <Bell size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">3</h3>
                            <p className="text-slate-500 text-sm">New Notifications</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center py-20">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">No Recent Activity</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            You haven't started any activities yet. Explore the course catalog to get started.
                        </p>
                        <button className="mt-6 px-6 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors">
                            Browse Courses
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
