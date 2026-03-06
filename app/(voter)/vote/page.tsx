'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Vote as VoteIcon, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface IPosition {
    _id: string;
    posName: string;
    numOfPositions: number;
}

interface ICandidate {
    _id: string;
    candFName: string;
    candLName: string;
    posID: string;
    party?: string; // Added to match UI needs
}

export default function VotingPage() {
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [selections, setSelections] = useState<Record<string, string>>({}); // { posID: candID }
    const [loading, setLoading] = useState<boolean>(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Auth states for the submission modal
    const [voterID, setVoterID] = useState("");
    const [voterPass, setVoterPass] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    fetch('/api/positions', { cache: 'no-store' }),
                    fetch('/api/candidates', { cache: 'no-store' })
                ]);
                if (!pRes.ok || !cRes.ok) throw new Error("Failed to load ballot");
                setPositions(await pRes.json());
                setCandidates(await cRes.json());
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSelect = (posID: string, candID: string) => {
        setSelections((prev) => ({ ...prev, [posID]: candID }));
    };

    const allSelected = positions.length > 0 && positions.every((p) => selections[p._id]);

    const handleSubmit = async () => {
        if (!voterID || !voterPass) {
            alert("Please provide your credentials in the confirmation box.");
            return;
        }

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    voterID,
                    voterPass,
                    selectedVotes: Object.entries(selections).map(([posID, candID]) => ({ posID, candID }))
                })
            });

            const data = await res.json();
            if (data.error) {
                alert(`Voting Error: ${data.error}`);
            } else {
                setShowConfirm(false);
                setSubmitted(true);
            }
        } catch (err) {
            alert("Network error: Could not submit vote.");
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
    );

    if (submitted) return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Vote Submitted!</h2>
                <p className="text-slate-500">Your choice has been securely recorded. Thank you for voting.</p>
            </motion.div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold mb-2">Cast Your Vote</h1>
                <p className="text-slate-500 mb-8">Select one candidate for each position below to complete your ballot.</p>

                {positions.map((pos) => (
                    <div key={pos._id} className="mb-12">
                        <h2 className="text-xl font-semibold mb-4 text-slate-800">{pos.posName}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {candidates
                                .filter((c) => c.posID === pos._id)
                                .map((candidate) => {
                                    const isSelected = selections[pos._id] === candidate._id;
                                    return (
                                        <button
                                            key={candidate._id}
                                            onClick={() => handleSelect(pos._id, candidate._id)}
                                            className={`p-5 rounded-xl border text-left transition-all duration-200 ${isSelected
                                                    ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-600/20"
                                                    : "border-slate-200 bg-white hover:border-blue-400"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">
                                                        {candidate.candFName} {candidate.candLName}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 mt-1">{candidate.party || "Independent"}</p>
                                                </div>
                                                {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />}
                                            </div>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!allSelected}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-sm font-bold transition-all active:scale-95 ${allSelected ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    <VoteIcon className="h-5 w-5" />
                    Review & Submit Ballot
                </button>
            </motion.div>

            {/* Modern Confirmation Modal replacing prompt() */}
            <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Finalize Your Ballot">
                <div className="space-y-4">
                    <p className="text-slate-500 text-sm">To verify your identity and cast your vote, please enter your credentials.</p>
                    <input
                        type="text" placeholder="Voter ID"
                        className="w-full p-2 border rounded-lg"
                        value={voterID} onChange={(e) => setVoterID(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Password"
                        className="w-full p-2 border rounded-lg"
                        value={voterPass} onChange={(e) => setVoterPass(e.target.value)}
                    />
                    <div className="flex gap-3 mt-6">
                        <button onClick={handleSubmit} className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold">Cast Vote Now</button>
                        <button onClick={() => setShowConfirm(false)} className="px-4 py-3 bg-slate-100 rounded-lg">Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}