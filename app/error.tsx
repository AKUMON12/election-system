'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service (Sentry, etc.)
        console.error("Runtime Application Error:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center"
            >
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Unexpected Error
                </h2>

                <p className="mt-4 text-slate-500 dark:text-slate-400">
                    We encountered a problem while processing this page. This might be a temporary connection issue.
                </p>

                {/* Technical details (Optional: hide in production) */}
                <div className="mt-6 rounded-lg bg-red-50 p-4 border border-red-100 dark:bg-red-900/10 dark:border-red-900/20">
                    <p className="text-xs font-mono text-red-700 dark:text-red-400 break-all">
                        Error: {error.message || "Unknown system failure"}
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 dark:shadow-none"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Try Again
                    </button>

                    <Link
                        href="/public"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}