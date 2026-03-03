"use client";

import React from "react";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
}

// Ensure T extends something with an ID for unique keys
function DataTable<T extends { id: string | number }>({
    columns,
    data,
    emptyMessage = "No data available",
}: DataTableProps<T>) {
    return (
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-800/50">
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-slate-500 text-sm"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-slate-800/40 transition-colors duration-150 group"
                                >
                                    {columns.map((col) => (
                                        <td key={String(col.key)} className="px-6 py-4 text-sm text-slate-300">
                                            {col.render
                                                ? col.render(item)
                                                : String(item[col.key as keyof T] ?? "")}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;