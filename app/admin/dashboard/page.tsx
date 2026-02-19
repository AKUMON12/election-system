"use client"; // Required for framer-motion animations

import { motion } from "framer-motion";
import { Users, Award, Briefcase, BarChart3 } from "lucide-react";
// Import from your data folder - adjust path if you moved mockData.ts
import { mockCandidates, mockPositions, mockVoters } from "@/data/mockData";

const stats = [
    {
        label: "Total Voters",
        value: mockVoters.length,
        icon: Users,
        color: "text-blue-600", // Standard Tailwind or your custom theme color
    },
    {
        label: "Candidates",
        value: mockCandidates.length,
        icon: Award,
        color: "text-purple-600",
    },
    {
        label: "Positions",
        value: mockPositions.length,
        icon: Briefcase,
        color: "text-green-600",
    },
    {
        label: "Votes Cast",
        value: mockVoters.filter((v) => v.hasVoted).length,
        icon: BarChart3,
        color: "text-orange-600",
    },
];

export default function AdminDashboardPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold mb-6 tracking-tight">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <stat.icon className={`h-8 w-8 ${stat.color} mb-3`} />
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {[
                        "Alice Johnson received 12 new votes for President",
                        "New voter Sarah Wilson registered",
                        "Position 'Treasurer' was added",
                    ].map((activity, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                        >
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                            {activity}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
