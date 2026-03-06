'use client';

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Trophy, Loader2 } from "lucide-react";

interface IElectionResult {
    _id: string;
    candidateName: string;
    posName: string;
    voteCount: number;
    percentage: number;
    party?: string; // Optional if not in current API
}

export default function ResultsPage() {
    const [results, setResults] = useState<IElectionResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchResults = async () => {
        try {
            const res = await fetch('/api/results', { cache: 'no-store' });
            if (!res.ok) throw new Error("Could not retrieve results.");
            const data: IElectionResult[] = await res.json();
            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    // Helper: Group results by position (e.g., "President": [candidates])
    const groupedResults = results.reduce((acc, current) => {
        const key = current.posName;
        if (!acc[key]) acc[key] = [];
        acc[key].push(current);
        return acc;
    }, {} as Record<string, IElectionResult[]>);

    if (loading) return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-xl font-medium animate-pulse text-slate-600">Calculating live tallies...</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <header className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Election Results</h1>
                    <p className="text-slate-500">Live vote tallies monitored in real-time.</p>
                </header>

                {Object.keys(groupedResults).length > 0 ? (
                    Object.entries(groupedResults).map(([posName, candidates]) => {
                        // Sort candidates within this position by votes descending
                        const sortedCandidates = [...candidates].sort((a, b) => b.voteCount - a.voteCount);
                        const winnerId = sortedCandidates[0]?._id;

                        return (
                            <div key={posName} className="mb-12">
                                <h2 className="text-xl font-semibold mb-4 border-l-4 border-blue-600 pl-4">
                                    {posName}
                                </h2>
                                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-4">Candidate</th>
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-4">Votes</th>
                                                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-4">Share</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {sortedCandidates.map((c) => {
                                                const isWinner = c._id === winnerId && c.voteCount > 0;
                                                return (
                                                    <tr key={c._id} className={`transition-colors ${isWinner ? "bg-blue-50/30" : "hover:bg-slate-50/50"}`}>
                                                        <td className="px-6 py-4 text-sm font-medium flex items-center gap-2">
                                                            {isWinner && <Trophy className="h-4 w-4 text-orange-500" />}
                                                            <span className={isWinner ? "text-blue-700" : "text-slate-900"}>{c.candidateName}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                                            {c.voteCount.toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[100px]">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${c.percentage}%` }}
                                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                                        className={`h-full rounded-full ${isWinner ? "bg-blue-600" : "bg-slate-400"}`}
                                                                    />
                                                                </div>
                                                                <span className="text-xs font-bold text-slate-600 w-12 text-right">
                                                                    {c.percentage.toFixed(1)}%
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-20 text-center border-2 border-dashed rounded-2xl bg-slate-50">
                        <p className="text-slate-500 font-medium">No results recorded yet. Check back after voting begins.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}