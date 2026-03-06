// lib/election-logic.ts
import clientPromise from './mongodb';

export async function getElectionStatus() {
    const client = await clientPromise;
    const db = client.db('election-db');

    // Example logic: fetch a document that defines if the election is open
    const settings = await db.collection('settings').findOne({ id: 'election-config' });
    return settings?.status || 'closed';
}