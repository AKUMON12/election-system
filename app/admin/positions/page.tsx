'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";

import DataTable from "@/components/DataTable";
import Modal from "@/components/ui/Modal";
import PositionForm from "@/components/forms/PositionForm";

// 1. FIX: Added 'id' to the interface to satisfy the DataTable requirement
interface IPosition {
    id: string; // Required for DataTable
    _id: string; // Used for MongoDB
    posName: string;
    numOfPositions: number;
    posStat: boolean;
}

export default function PositionsPage() {
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchPositions = async () => {
        try {
            const res = await fetch('/api/positions', { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();

            // 2. FIX: Map _id to id so the DataTable is happy
            const formattedData = data.map((pos: any) => ({
                ...pos,
                id: pos._id // Satisfy the id requirement
            }));

            setPositions(formattedData);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    // 3. FIX: Changed parameter to match PositionForm's expected keys
    const handleAdd = async (formData: { posName: string; numOfPositions: number }) => {
        const newPos: IPosition = {
            id: String(Date.now()),
            _id: String(Date.now()),
            posName: formData.posName,
            numOfPositions: formData.numOfPositions,
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

            <DataTable
                columns={[
                    { key: "posName", label: "Position Name" },
                    { key: "numOfPositions", label: "Max Winners" },
                    {
                        key: "posStat",
                        label: "Status",
                        // 4. FIX: render receives the 'item' (the whole row), not just the value
                        render: (item: IPosition) => (
                            <span className={item.posStat ? "text-green-600 font-bold" : "text-red-600"}>
                                {item.posStat ? 'Active' : 'Inactive'}
                            </span>
                        )
                    },
                ]}
                data={positions}
            />

            <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Position">
                <PositionForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </motion.div>
    );
}