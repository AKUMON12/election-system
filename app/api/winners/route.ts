import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("election_db");

        const winners = await db.collection("positions").aggregate([
            {
                // Find candidates for this position
                $lookup: {
                    from: "candidates",
                    localField: "_id",
                    foreignField: "posID",
                    as: "contestants"
                }
            },
            { $unwind: "$contestants" },
            {
                // Count votes for each contestant
                $lookup: {
                    from: "votes",
                    localField: "contestants._id",
                    foreignField: "candID",
                    as: "votesReceived"
                }
            },
            {
                $project: {
                    posName: 1,
                    numOfPositions: 1,
                    candidateName: { $concat: ["$contestants.candFName", " ", "$contestants.candLName"] },
                    totalVotes: { $size: "$votesReceived" }
                }
            },
            { $sort: { posName: 1, totalVotes: -1 } },
            {
                // Group by position to handle multi-winner scenarios (like Senators)
                $group: {
                    _id: "$posName",
                    maxWinners: { $first: "$numOfPositions" },
                    candidates: { $push: { name: "$candidateName", votes: "$totalVotes" } }
                }
            },
            {
                // Slice the array based on the allowed number of winners (e.g., top 12)
                $project: {
                    position: "$_id",
                    winners: { $slice: ["$candidates", "$maxWinners"] }
                }
            }
        ]).toArray();

        return NextResponse.json(winners);
    } catch (err: unknown) {
        return NextResponse.json({ error: "Failed to calculate winners" }, { status: 500 });
    }
}