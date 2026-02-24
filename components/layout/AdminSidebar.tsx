"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    Award,
    Briefcase,
    ChevronLeft,
    Shield,
    LogOut,
} from "lucide-react";

const navItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Candidates", url: "/admin/candidates", icon: Award },
    { title: "Positions", url: "/admin/positions", icon: Briefcase },
    { title: "Voters", url: "/admin/voters", icon: Users },
];

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        router.push("/admin/login");
    };

    const isActive = (path: string) => pathname === path;

    return (
        <aside
            className={`h-screen sticky top-0 border-r border-slate-800 bg-slate-900 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"
                }`}
        >
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
                {!collapsed && (
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <span className="font-bold text-sm text-white">Admin Panel</span>
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    // FIX: Added aria-label and title for accessibility
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="p-1.5 rounded-md hover:bg-slate-800 transition-colors text-slate-400"
                >
                    <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
                </button>
            </div>

            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.url}
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(item.url)
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-1">
                <Link
                    href="/public"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {!collapsed && <span>Back to Site</span>}
                </Link>
                <button
                    onClick={handleLogout}
                    // FIX: Added aria-label for the logout button (good practice even with text)
                    aria-label="Logout"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors w-full"
                >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
}