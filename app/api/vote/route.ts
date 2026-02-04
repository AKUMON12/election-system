import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// 1. Define the shape of a single vote
interface IVoteSelection {
    posID: string;
    candID: string;
}

// 2. Define the shape of the request body
interface IVoteRequestBody {
    voterID: string;
    voterPass: string;
    selectedVotes: IVoteSelection[];
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);

        if (!body) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }

        // Apply the interface to the body
        const { voterID, voterPass, selectedVotes } = body as IVoteRequestBody;

        const client = await clientPromise;
        const db = client.db("election_db");

        // 1. Check if voter exists
        const voter = await db.collection("voters").findOne({ voterID, voterPass });

        if (!voter) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }

        // 2. Check voter status
        if (!voter.voterStat) {
            return NextResponse.json({ error: "Voter account is inactive" }, { status: 403 });
        }
        if (voter.voted) {
            return NextResponse.json({ error: "You have already voted!" }, { status: 403 });
        }

        // 3. Record the votes - 'v' is now typed as IVoteSelection
        const voteEntries = selectedVotes.map((v: IVoteSelection) => ({
            posID: v.posID,
            candID: v.candID,
            voterID: voter.voterID,
            timestamp: new Date()
        }));

        await db.collection("votes").insertMany(voteEntries);

        // 4. Update voter status to prevent double voting
        await db.collection("voters").updateOne(
            { voterID: voter.voterID },
            { $set: { voted: true } }
        );

        return NextResponse.json({ success: true, message: "Vote cast successfully!" });

    } catch (error: unknown) {
        console.error("DEBUG ERROR:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}