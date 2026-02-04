'use client'; // Error components must be Client Components

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button onClick={() => reset()} className="px-4 py-2 bg-red-600 text-white rounded">
                Try again
            </button>
        </div>
    );
}