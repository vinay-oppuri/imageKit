import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConfig";
import { Community } from "@/models/communityModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const admin = await User.findOne({ email: session?.user?.email });

    const { name, description } = await req.json();

    const community = await Community.create({
      name,
      description,
      admin: admin._id,
      members: []
    });

    return NextResponse.json({ message: "Community created", community });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}