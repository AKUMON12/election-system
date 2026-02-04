import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("election_db");

        // Fetching positions from MongoDB
        const positions = await db.collection("positions").find({}).toArray();

        return NextResponse.json(positions);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("election_db");

    const result = await db.collection("positions").insertOne(body);
    return NextResponse.json(result);
}