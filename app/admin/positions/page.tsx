'use client'; // Required for client-side interactivity like forms/clicks

import { useState, useEffect } from 'react';

// Define the shape of a Position based on the SQL schema provided
interface IPosition {
    _id: string;
    posName: string;
    numOfPositions: number;
    posStat: boolean;
}

export default function PositionsPage() {
    // Specify the state type as an array of IPosition
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetching data with 'no-store' logic via our API
    const fetchPositions = async () => {
        try {
            // Using cache: 'no-store' as requested for dynamic rendering
            const res = await fetch('/api/positions', { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch");

            const data: IPosition[] = await res.json();
            setPositions(data);
        } catch (err) {
            // Alert tag for error handling as requested
            alert("Error: Could not load the positions list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    // Stating page: Loading state
    if (loading) return (
        <div className="p-8 text-center animate-pulse">
            <p className="text-xl font-semibold">Loading election positions...</p>
        </div>
    );

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold">Positions Management</h2>

            {/* Action button with basic alert implementation */}
            <button
                onClick={() => alert("This would trigger the Add Position modal/form.")}
                className="my-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
            >
                Add New Position
            </button>

            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Position Name</th>
                        <th className="border p-2">Max Winners</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Explicitly typed iteration to avoid 'any' */}
                    {positions.map((pos: IPosition) => (
                        <tr key={pos._id} className="border-t hover:bg-gray-50">
                            <td className="p-2 border">{pos.posName}</td>
                            <td className="p-2 border text-center">{pos.numOfPositions}</td>
                            <td className="p-2 border text-center">
                                <span className={pos.posStat ? "text-green-600 font-bold" : "text-red-600"}>
                                    {pos.posStat ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="p-2 border text-center">
                                <button
                                    onClick={() => alert(`Deactivating ${pos.posName}...`)}
                                    className="text-red-600 hover:underline font-medium"
                                >
                                    Deactivate
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Empty state handling */}
            {positions.length === 0 && (
                <p className="mt-4 text-gray-500 text-center">No positions found in the database.</p>
            )}
        </div>
    );
}