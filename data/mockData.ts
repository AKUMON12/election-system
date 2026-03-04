"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Updated imports to be safer
import { mockCandidates, mockPositions, type Candidate, type Position } from "@/data/mockData";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import CandidateForm from "@/components/forms/CandidateForm";

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = (data: {
        candFName: string;
        candLName: string;
        posID: string;
        party: string;
    }) => {
        const newCandidate: Candidate = {
            id: String(Date.now()),
            name: `${data.candFName} ${data.candLName}`,
            position: data.posID,
            party: data.party,
            votes: 0,
        };

        setCandidates((prev) => [...prev, newCandidate]);
        setShowModal(false);
    };

    return (
        <motion.div
            initial= {{ opacity: 0, y: 10 }
}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.3 }}
className = "p-6"
    >
    <div className="flex items-center justify-between mb-6" >
        <h1 className="text-2xl font-bold tracking-tight" > Candidates </h1>
            < button
onClick = {() => setShowModal(true)}
className = "inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-transform active:scale-95"
    >
    <Plus className="h-4 w-4" />
        Add Candidate
            </button>
            </div>

            < DataTable
columns = {
    [
    { key: "name", label: "Name" },
    { key: "position", label: "Position" },
    { key: "party", label: "Party" },
    { key: "votes", label: "Votes" },
                ]}
data = { candidates }
    />

    <Modal
                open={ showModal }
onClose = {() => setShowModal(false)}
title = "Add Candidate"
    >
    <CandidateForm
                    positions={ mockPositions.map((p: Position) => p.title) }
onSubmit = { handleAdd }
onCancel = {() => setShowModal(false)}
                />
    </Modal>
    </motion.div>
    );
}