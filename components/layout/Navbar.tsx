"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const linkClass = (path: string) =>
        `text-sm font-medium transition-colors duration-200 ${isActive(path) ? "text-blue-600" : "text-slate-400 hover:text-white"
        }`;

    return (
        <nav className="relative z-50 border-b border-slate-800 backdrop-blur-md bg-slate-950/80 sticky top-0">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/public" className="flex items-center gap-2 group">
                    <Shield className="h-6 w-6 text-blue-600 transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-bold text-lg tracking-tight text-white">
                        ElectHub
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/public" className={linkClass("/public")}>Home</Link>
                    <Link href="/public/vote" className={linkClass("/public/vote")}>Vote</Link>
                    <Link href="/public/results" className={linkClass("/public/results")}>Results</Link>
                    <Link
                        href="/admin/dashboard"
                        className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-transform active:scale-95"
                    >
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}