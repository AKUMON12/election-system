"use client"; // Required for state, motion, and Modal interaction

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";

// Updated paths to the root-level shared folders
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import VoterForm from "@/components/forms/VoterForm";
import { mockVoters, type Voter } from "@/data/mockData";

export default function VotersPage() {
    const [voters, setVoters] = useState<Voter[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // 1. Fetching Logic (Ready for your Next.js API)
    useEffect(() => {
        const fetchVoters = async () => {
            try {
                // Switch to your real API endpoint when ready: /api/voters
                // For now, initializing with mockData to verify UI
                setVoters(mockVoters);
            } catch (err) {
                console.error("Failed to load voters:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVoters();
    }, []);

    // 2. Action Handler
    const handleAdd = (data: { name: string; email: string }) => {
        const newVoter: Voter = {
            id: String(Date.now()),
            hasVoted: false,
            ...data,
        };
        setVoters((prev) => [...prev, newVoter]);
        setShowModal(false);
    };

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 font-medium">Loading voter records...</span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Voters</h1>
                    <p className="text-sm text-slate-500">Monitor registration and voting status.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    Add Voter
                </button>
            </div>

            {/* 3. DataTable with custom Status badges */}
            <DataTable
                columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    {
                        key: "hasVoted",
                        label: "Status",
                        render: (voter: Voter) => (
                            <span
                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${voter.hasVoted
                                        ? "bg-green-100 text-green-700"
                                        : "bg-slate-100 text-slate-600"
                                    }`}
                            >
                                {voter.hasVoted ? "Voted" : "Pending"}
                            </span>
                        ),
                    },
                ]}
                data={voters}
            />

            {/* 4. Registration Modal */}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                title="Register New Voter"
            >
                <VoterForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>

            {voters.length === 0 && (
                <div className="mt-10 text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500 text-sm">No registered voters found.</p>
                </div>
            )}
        </motion.div>
    );
}
