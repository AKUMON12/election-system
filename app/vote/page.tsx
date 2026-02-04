'use client';

import { useState, useEffect } from 'react';

// Define the interface for a Position
interface IPosition {
    _id: string;
    posName: string;
    numOfPositions: number;
}

// Define the interface for a Candidate
interface ICandidate {
    _id: string;
    candFName: string;
    candLName: string;
    posID: string;
}

export default function VotingPage() {
    // Specify state types using the interfaces
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [selection, setSelection] = useState<Record<string, string>>({}); // { posID: candID }
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch positions and candidates concurrently with cache: 'no-store'
                const [pRes, cRes] = await Promise.all([
                    fetch('/api/positions', { cache: 'no-store' }),
                    fetch('/api/candidates', { cache: 'no-store' })
                ]);

                if (!pRes.ok || !cRes.ok) throw new Error("Failed to load election data");

                const pData: IPosition[] = await pRes.json();
                const cData: ICandidate[] = await cRes.json();

                setPositions(pData);
                setCandidates(cData);
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : "Error loading data";
                alert(msg);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleVote = async () => {
        const voterID = prompt("Enter Voter ID");
        const voterPass = prompt("Enter Password");

        if (!voterID || !voterPass) {
            alert("Credentials are required to vote.");
            return;
        }

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    voterID,
                    voterPass,
                    selectedVotes: Object.entries(selection).map(([posID, candID]) => ({ posID, candID }))
                })
            });

            const data = await res.json();
            if (data.error) {
                alert(`Voting Error: ${data.error}`);
            } else {
                alert("Vote Cast Successfully! Thank you for participating.");
            }
        } catch (err: unknown) {
            alert("Network error: Could not submit vote.");
        }
    };

    if (loading) return (
        <div className="p-10 text-center">
            <p className="animate-pulse text-lg">Loading ballot...</p>
        </div>
    );

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2">Voting Booth</h1>

            {positions.map((pos: IPosition) => (
                <div key={pos._id} className="mb-8 p-6 border rounded-xl shadow-sm bg-white">
                    <h3 className="text-xl font-semibold text-blue-800">
                        {pos.posName} <span className="text-sm font-normal text-gray-500">(Choose {pos.numOfPositions})</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {/* Corrected: Typing 'cand' as ICandidate instead of 'any' */}
                        {candidates
                            .filter((cand: ICandidate) => cand.posID === pos._id)
                            .map((cand: ICandidate) => (
                                <label key={cand._id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                                    <input
                                        type="radio"
                                        name={pos._id}
                                        className="w-4 h-4 text-blue-600"
                                        onChange={() => setSelection({ ...selection, [pos._id]: cand._id })}
                                    />
                                    <span className="ml-3 font-medium text-gray-700">
                                        {cand.candFName} {cand.candLName}
                                    </span>
                                </label>
                            ))}
                    </div>
                </div>
            ))}

            <div className="mt-10 flex flex-col items-center">
                <button
                    onClick={handleVote}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-4 rounded-full shadow-lg transform active:scale-95 transition-all"
                >
                    Submit Final Ballot
                </button>
                <p className="text-gray-400 text-sm mt-4 italic text-center">
                    Please ensure your selections are correct before submitting.
                </p>
            </div>
        </div>
    );
}