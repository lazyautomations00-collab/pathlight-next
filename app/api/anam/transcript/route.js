import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";
import Transcript from "../../../../models/Transcript";
import User from "../../../../models/User";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
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

        // Get payload
        const body = await req.json();
        const { sessionId, personaId, messages } = body;

        if (!messages || !Array.isArray(messages)) {
             return NextResponse.json(
                { success: false, message: "Bad Request: messages array is required" },
                { status: 400 }
            );
        }

        // Check if user exists to get the email
        const user = await User.findById(decoded?.user?.id).lean();
        const userEmail = user ? user.email : "unknown@anonymous.com";

        // Save transcript
        const transcript = await Transcript.create({
            userId: decoded?.user?.id || "unknown",
            userEmail: userEmail,
            sessionId: sessionId || "unknown",
            personaId: personaId || "unknown",
            messages: messages.map(m => ({
                role: m.role,
                content: m.content,
                timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
            }))
        });

        return NextResponse.json({
            success: true,
            message: "Transcript saved successfully",
            transcriptId: transcript._id
        });

    } catch (error) {
        console.error("Transcript save error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save transcript", error: error.message },
            { status: 500 }
        );
    }
}
