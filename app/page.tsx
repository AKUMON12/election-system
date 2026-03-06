// app/page.tsx
import { getElectionStatus } from '@/lib/election-logic'; // Your backend helper
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
    const status = await getElectionStatus(); // e.g., 'open', 'closed', 'pending'

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1>Welcome to the Election System</h1>

            {status === 'open' ? (
                <Button asChild>
                    <Link href="/vote">Go to Voting Booth</Link>
                </Button>
            ) : (
                <Button asChild variant="outline">
                    <Link href="/results">View Election Results</Link>
                </Button>
            )}
        </main>
    );
}