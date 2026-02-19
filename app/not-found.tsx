"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileSearch, Home, ChevronLeft } from "lucide-react";

export default function GlobalNotFound() {
    const pathname = usePathname();

    useEffect(() => {
        // Analytics or Error logging
        console.error(`Global 404: Path ${pathname} does not exist.`);
    }, [pathname]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 dark:bg-slate-950">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md text-center"
            >
                <div className="relative mb-8 inline-block">
                    <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-xl" />
                    <div className="relative rounded-full bg-slate-50 p-6 dark:bg-slate-900">
                        <FileSearch className="h-12 w-12 text-blue-600" />
                    </div>
                </div>

                <h1 className="mb-2 text-7xl font-black text-slate-200 dark:text-slate-800">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Lost in the system?
                </h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                    The page <span className="font-mono text-blue-500">"{pathname}"</span> doesn't exist or has been moved to a restricted area.
                </p>

                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/public"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 sm:w-auto"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </div>
            </motion.div>

            {/* Decorative background element */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 opacity-20" />
        </div>
    );
}