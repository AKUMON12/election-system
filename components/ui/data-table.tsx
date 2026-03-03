'use client';

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

function DataTable<T extends { id: string | number }>({
    columns,
    data,
    emptyMessage = "No data available",
}: DataTableProps<T>) {
    return (
        <div className="border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted/50">
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-6 py-3"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-muted-foreground text-sm"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-muted/30 transition-colors duration-150"
                                >
                                    {columns.map((col) => (
                                        <td key={String(col.key)} className="px-6 py-4 text-sm">
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
