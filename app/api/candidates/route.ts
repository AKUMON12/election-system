import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("election_db");

        // Fetch all candidates and convert to an array
        const candidates = await db.collection("candidates").find({}).toArray();

        return NextResponse.json(candidates);
    } catch (error: unknown) {
        return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
    }
}