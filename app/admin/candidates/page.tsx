"use client"; // Required for state, motion, and event handlers

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Updated paths to use the root-level folders (@ alias)
import { mockCandidates, mockPositions, type Candidate } from "@/data/mockData";
import DataTable from "@/components/DataTable";
import Modal from "@/components/ui/Modal";
import CandidateForm from "@/components/forms/CandidateForm";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = (data: { candFName: string; candLName: string; posID: string; party: string }) => {
        const position = mockPositions.find((p) => p.id === data.posID);
        setCandidates((prev) => [
            ...prev,
            {
                id: String(Date.now()),
                name: `${data.candFName} ${data.candLName}`,
                position: position?.title || data.posID,
                party: data.party,
                votes: 0,
            },
        ]);
        setShowModal(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-transform active:scale-95"
                >
                    <Plus className="h-4 w-4" />
                    Add Candidate
                </button>
            </div>

            <DataTable
                columns={[
                    { key: "name", label: "Name" },
                    { key: "position", label: "Position" },
                    { key: "party", label: "Party" },
                    { key: "votes", label: "Votes" },
                ]}
                data={candidates}
            />

            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                title="Add Candidate"
            >
                <CandidateForm
                    positions={mockPositions}
                    onSubmit={handleAdd}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </motion.div>
    );
}
