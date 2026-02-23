'use client';

import { useState } from "react";

interface VoterFormProps {
    // Added voterID to align with your voting booth authentication logic
    onSubmit: (data: { name: string; email: string; voterID: string }) => void;
    onCancel: () => void;
}

const VoterForm = ({ onSubmit, onCancel }: VoterFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [voterID, setVoterID] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && voterID) {
            onSubmit({ name, email, voterID });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Full Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="e.g. Jane Smith"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Email Address
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="jane@example.com"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Voter ID / Student Number
                </label>
                <input
                    type="text"
                    value={voterID}
                    onChange={(e) => setVoterID(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="e.g. 2024-0001"
                    required
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold btn-scale shadow-lg shadow-blue-900/20"
                >
                    Register Voter
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

export default VoterForm;