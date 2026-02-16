'use client';

import { useEffect, useState } from 'react';

// Define the shape of a Result item
// This matches the data we expect from the aggregation pipeline
interface IElectionResult {
    _id: string;            // Candidate ID
    candidateName: string;  // Full name of candidate
    posName: string;        // The position they are running for
    voteCount: number;      // Total votes earned
    percentage: number;     // Calculation: (votes / total_voters_who_voted) * 100
}

export default function ResultsPage() {
    // State typed to our interface array
    const [results, setResults] = useState<IElectionResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchResults = async () => {
        try {
            // Apply caching: 'no-store' to ensure live updates
            const res = await fetch('/api/results', { cache: 'no-store' });

            if (!res.ok) {
                throw new Error("Could not retrieve election results.");
            }

            const data: IElectionResult[] = await res.json();
            setResults(data);
        } catch (err: unknown) {
            // Type guarding: Check if err is an instance of Error
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";

            // Use an alert for immediate notification as requested
            alert(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    // Stating page: Loading state
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl font-medium animate-pulse">Calculating live tallies...</p>
            </div>
        );
    }

    // Stating page: Error state
    if (error) {
        return (
            <div className="p-10 text-center text-red-600">
                <h2 className="text-2xl font-bold">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center border-b pb-4">
                Live Election Results
            </h1>

            <div className="space-y-6">
                {results.length > 0 ? (
                    results.map((item: IElectionResult) => (
                        <div key={item._id} className="p-5 border rounded-lg shadow-sm bg-white">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h2 className="text-lg font-bold uppercase">{item.candidateName}</h2>
                                    <p className="text-sm text-gray-500">{item.posName}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-mono font-bold text-blue-700">
                                        {item.voteCount}
                                    </span>
                                    <span className="text-gray-400 text-sm ml-1">votes</span>
                                </div>
                            </div>

                            {/* Progress bar representing voting percentage */}
                            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border">
                                <div
                                    className="bg-blue-600 h-full transition-all duration-500"
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-xs mt-1 font-semibold text-gray-600">
                                {item.percentage.toFixed(2)}% of total votes
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="p-10 text-center border-2 border-dashed rounded-lg">
                        <p className="text-gray-500">No votes have been cast yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}