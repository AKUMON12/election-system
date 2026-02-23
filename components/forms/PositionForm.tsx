'use client';

import { useState } from "react";

interface PositionFormProps {
    onSubmit: (data: { posName: string; numOfPositions: number }) => void;
    onCancel: () => void;
}

const PositionForm = ({ onSubmit, onCancel }: PositionFormProps) => {
    const [posName, setPosName] = useState("");
    const [count, setCount] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (posName) {
            onSubmit({
                posName,
                numOfPositions: count
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label
                    htmlFor="posName"
                    className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                >
                    Position Title
                </label>
                <input
                    id="posName"
                    type="text"
                    value={posName}
                    onChange={(e) => setPosName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="e.g. President, Senator, Treasurer"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="count"
                    className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                >
                    Number of Slots
                </label>
                <input
                    id="count"
                    type="number"
                    min="1"
                    title="Enter number of slots" // Satisfies the accessibility requirement
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
                <p className="mt-1.5 text-xs text-slate-500">
                    How many candidates can be elected for this position?
                </p>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold btn-scale shadow-lg shadow-blue-900/20"
                >
                    Add Position
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PositionForm;