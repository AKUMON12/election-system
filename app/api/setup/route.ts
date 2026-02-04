import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("election_db");

        // 1. Clear existing data to start fresh
        await db.collection("positions").deleteMany({});
        await db.collection("voters").deleteMany({});
        await db.collection("candidates").deleteMany({});
        await db.collection("votes").deleteMany({}); // Clear votes too for a clean test

        // 2. Insert Positions
        const positions = [
            { posName: "President", numOfPositions: 1, posStat: true },
            { posName: "Vice President", numOfPositions: 1, posStat: true },
            { posName: "Senator", numOfPositions: 12, posStat: true }
        ];
        const posResult = await db.collection("positions").insertMany(positions);

        // Map the IDs so we can link candidates accurately
        // posResult.insertedIds looks like { 0: ObjectId(...), 1: ObjectId(...) }
        const presId = posResult.insertedIds[0];
        const vpId = posResult.insertedIds[1];
        const senId = posResult.insertedIds[2];

        // 3. Insert Candidates (Linked to the auto-generated Position IDs)
        const candidates = [
            { candFName: "Juan", candLName: "Dela Cruz", posID: presId, candStat: true },
            { candFName: "Maria", candLName: "Clara", posID: presId, candStat: true },
            { candFName: "Jose", candLName: "Rizal", posID: vpId, candStat: true },
            { candFName: "Antonio", candLName: "Luna", posID: senId, candStat: true },
            { candFName: "Melchora", candLName: "Aquino", posID: senId, candStat: true }
        ];
        await db.collection("candidates").insertMany(candidates);

        // 4. Insert Test Voter
        const voters = [
            {
                voterID: "2025-0001",
                voterPass: "Tristan69-",
                voterFName: "Test",
                voterLName: "User",
                voterStat: true,
                voted: false
            }
        ];
        await db.collection("voters").insertMany(voters);

        return NextResponse.json({
            message: "Database Seeded Successfully!",
            details: "Positions, Candidates, and Voters have been initialized."
        });

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during seeding";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}