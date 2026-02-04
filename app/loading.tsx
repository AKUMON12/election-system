export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-xl">Processing Election Data...</p>
        </div>
    );
}