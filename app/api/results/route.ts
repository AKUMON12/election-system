import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("election_db");

        // 1. Get the total number of voters who have actually cast a vote
        const totalVotersWhoVoted = await db.collection("voters").countDocuments({ voted: true });

        // 2. Complex Aggregation to join Candidates with their Vote counts
        const results = await db.collection("candidates").aggregate([
            {
                // Join with the 'votes' collection
                $lookup: {
                    from: "votes",
                    localField: "_id", // candID in SQL
                    foreignField: "candID",
                    as: "rawVotes"
                }
            },
            {
                // Join with 'positions' to get the position name
                $lookup: {
                    from: "positions",
                    localField: "posID",
                    foreignField: "_id",
                    as: "posDetails"
                }
            },
            { $unwind: "$posDetails" },
            {
                // Project (Select) the specific fields we need
                $project: {
                    _id: 1,
                    candidateName: { $concat: ["$candFName", " ", "$candLName"] },
                    posName: "$posDetails.posName",
                    voteCount: { $size: "$rawVotes" },
                    // Calculate percentage based on total voters
                    percentage: {
                        $cond: [
                            { $gt: [totalVotersWhoVoted, 0] },
                            { $multiply: [{ $divide: [{ $size: "$rawVotes" }, totalVotersWhoVoted] }, 100] },
                            0
                        ]
                    }
                }
            },
            { $sort: { voteCount: -1 } } // Sort by highest votes
        ]).toArray();

        return NextResponse.json(results);
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}