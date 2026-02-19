"use client";

import Link from "next/link"; // Next.js Link component
import { motion } from "framer-motion";
import { Shield, Vote, BarChart3, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/50 text-sm text-slate-600 mb-8 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                    <Shield className="h-4 w-4 text-blue-600" />
                    Secure & Verified Election Infrastructure
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-slate-900 dark:text-white">
                    Secure Digital
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        Election System
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    A modern, transparent, and secure platform for managing elections
                    with real-time results and verified voter authentication.
                </p>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/public/vote"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none"
                    >
                        <Vote className="h-4 w-4" />
                        Cast Your Vote
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href="/public/results"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all active:scale-95 dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800"
                    >
                        <BarChart3 className="h-4 w-4" />
                        View Live Results
                    </Link>
                </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full"
            >
                {[
                    {
                        icon: Shield,
                        title: "End-to-End Encryption",
                        desc: "Every vote is cryptographically secured to ensure the integrity of the ballot box.",
                        color: "text-blue-600",
                    },
                    {
                        icon: Vote,
                        title: "Inclusive Access",
                        desc: "A simplified, accessible voting experience designed for every device and participant.",
                        color: "text-indigo-600",
                    },
                    {
                        icon: BarChart3,
                        title: "Live Audit Trail",
                        desc: "Live tallying with transparent, auditable vote counts provided in real-time.",
                        color: "text-cyan-600",
                    },
                ].map((feature, i) => (
                    <div
                        key={i}
                        className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800"
                    >
                        <feature.icon className={`h-10 w-10 ${feature.color} mb-5`} />
                        <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}