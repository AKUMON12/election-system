'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";

// UI Components from your React structure
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import PositionForm from "@/components/forms/PositionForm";

// Define the shape based on your MongoDB/API schema
interface IPosition {
    _id: string;
    posName: string;
    numOfPositions: number;
    posStat: boolean;
}

export default function PositionsPage() {
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // 1. Fetch Real Data from your Next.js API
    const fetchPositions = async () => {
        try {
            const res = await fetch('/api/positions', { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch");
            const data: IPosition[] = await res.json();
            setPositions(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    // 2. Handle Add (Logic from React project)
    const handleAdd = async (formData: { title: string }) => {
        // In a real app, you'd perform a fetch POST here to /api/positions
        // For now, we update local state to match your React project's behavior
        const newPos: IPosition = {
            _id: String(Date.now()),
            posName: formData.title,
            numOfPositions: 1,
            posStat: true,
        };

        setPositions((prev) => [...prev, newPos]);
        setShowModal(false);
    };

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 font-medium">Loading election positions...</span>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-display text-2xl font-bold">Positions</h1>
                    <p className="text-sm text-muted-foreground">Manage roles for the current election.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    Add Position
                </button>
            </div>

            {/* 3. Using your professional DataTable instead of a basic <table> */}
            <DataTable
                columns={[
                    { key: "posName", label: "Position Name" },
                    { key: "numOfPositions", label: "Max Winners" },
                    {
                        key: "posStat",
                        label: "Status",
                        render: (val: boolean) => (
                            <span className={val ? "text-green-600 font-bold" : "text-red-600"}>
                                {val ? 'Active' : 'Inactive'}
                            </span>
                        )
                    },
                ]}
                data={positions}
            />

            {/* 4. Using your professional Modal and Form */}
            <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Position">
                <PositionForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>

            {positions.length === 0 && !loading && (
                <div className="mt-10 text-center py-10 bg-gray-50 rounded-xl border border-dashed">
                    <p className="text-gray-500 text-sm">No positions found in the database.</p>
                </div>
            )}
        </motion.div>
    );
}