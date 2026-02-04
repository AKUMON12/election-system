import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-8">PH Election System</h1>
      <div className="flex gap-4 justify-center">
        {/* Using Link for client-side navigation */}
        <Link href="/vote" className="bg-blue-600 text-white px-6 py-2 rounded">
          Go to Voting Booth
        </Link>
        <Link href="/admin/positions" className="bg-gray-800 text-white px-6 py-2 rounded">
          Admin Dashboard
        </Link>
        <Link href="/results" className="bg-green-600 text-white px-6 py-2 rounded">
          View Results
        </Link>
      </div>
    </main>
  );
}