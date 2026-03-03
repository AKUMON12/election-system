import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <div className="relative w-full overflow-auto">
            <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
        </div>
    ),
);
Table.displayName = "Table";

// ... (Rest of your Table components: Header, Body, Row, etc. remain the same)
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };