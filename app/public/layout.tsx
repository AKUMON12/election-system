import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex flex-col bg-slate-950">
            {/* Shared Navbar for all public pages */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
}