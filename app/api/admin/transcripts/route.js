import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";
import Transcript from "../../../../models/Transcript";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req) {
    try {
        await dbConnect();

        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Missing or invalid token" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Invalid or expired token" },
                { status: 401 }
            );
        }

        // Check if user is an admin
        if (decoded?.user?.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Forbidden: Admin access required" },
                { status: 403 }
            );
        }

        // Fetch all transcripts, sorted by newest first
        const transcripts = await Transcript.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({
            success: true,
            transcripts
        });

    } catch (error) {
        console.error("Transcript fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch transcripts", error: error.message },
            { status: 500 }
        );
    }
}
