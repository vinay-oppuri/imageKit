import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConfig";
import { Community } from "@/models/communityModel";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const communities = await Community.find()
    .populate('admin', 'username email image')
    .lean();

    return NextResponse.json(communities);
  } catch (error) {
    console.error("Failed to fetch communities:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
