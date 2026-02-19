"use client"; // Required for state, router, and sessionStorage

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js equivalent of useNavigate
import { motion } from "framer-motion";
import { Shield, LogIn } from "lucide-react";

const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = "adminpassword";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Set the session flag that our AdminLayout checks for
            sessionStorage.setItem("admin_auth", "true");

            // Navigate to dashboard
            router.push("/admin/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to manage elections</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4"
                >
                    {error && (
                        <div className="px-4 py-2.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(""); }}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(""); }}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all active:scale-95 shadow-md"
                    >
                        <LogIn className="h-4 w-4" />
                        Sign In
                    </button>
                </form>
            </motion.div>
        </div>
    );
}