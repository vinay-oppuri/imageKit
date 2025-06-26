import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConfig";
import { Community } from "@/models/communityModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const { name } = await req.json();

    const user = await User.findOne({ email: session?.user?.email });
    const community = await Community.findOne({ name });

    if (!community) {
      return NextResponse.json({ error: "Community not found" });
    }

    if (community.admin._id.equals(user._id)) {
      return NextResponse.json({ error: "Admin cannot join their own community" });
    }

    // ✅ Add user to members if not already
    const updated = await Community.findOneAndUpdate(
      { name },
      { $addToSet: { members: user._id } },
      { new: true }
    );

    return NextResponse.json({ message: "Joined community", community: updated });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}