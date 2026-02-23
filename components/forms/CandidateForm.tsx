'use client';

import { useState } from "react";

interface Position {
    _id: string;
    posName: string;
}

interface CandidateFormProps {
    positions: Position[];
    onSubmit: (data: { candFName: string; candLName: string; posID: string; party: string }) => void;
    onCancel: () => void;
}

const CandidateForm = ({ positions, onSubmit, onCancel }: CandidateFormProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [posID, setPosID] = useState(positions[0]?._id || "");
    const [party, setParty] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (firstName && lastName && posID && party) {
            onSubmit({
                candFName: firstName,
                candLName: lastName,
                posID: posID,
                party
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="John"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Doe"
                        required
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="positionSelect"
                    className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                >
                    Running For Position
                </label>
                <select
                    id="positionSelect" // This matches the htmlFor above
                    title="Select a position" // This satisfies the 'axe' accessibility rule
                    value={posID}
                    onChange={(e) => setPosID(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all cursor-pointer"
                    required
                >
                    <option value="" disabled>Select a position</option>
                    {positions.map((p) => (
                        <option key={p._id} value={p._id} className="bg-slate-900">
                            {p.posName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor="party"
                    className="block text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                >
                    Political Party / Affiliation
                </label>
                <input
                    id="party"
                    type="text"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="e.g. Independent"
                    required
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold btn-scale shadow-lg shadow-blue-900/20"
                >
                    Register Candidate
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

export default CandidateForm;