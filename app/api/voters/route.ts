import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET all voters
export async function GET() {
    const client = await clientPromise;
    const db = client.db("election_db");
    const voters = await db.collection("voters").find({}).toArray();
    return NextResponse.json(voters);
}

// POST new voter
export async function POST(req: Request) {
    const body = await req.json(); // Expected: { voterID, voterPass, voterFName, ... }
    const client = await clientPromise;
    const db = client.db("election_db");

    // Set default status and voted flag
    const newVoter = { ...body, voterStat: true, voted: false };
    const result = await db.collection("voters").insertOne(newVoter);
    return NextResponse.json(result);
}