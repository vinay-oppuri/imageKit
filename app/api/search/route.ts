import { NextRequest, NextResponse } from "next/server";
import { Community } from "@/models/communityModel";
import connectDB from "@/lib/dbConfig";

export async function GET(req: NextRequest) {

    try {
        const {searchParams} = new URL(req.url)
        const q = searchParams.get('q') || ''

        await connectDB()

        const communities = await Community.find({
            name: {$regex: q, $options: 'i'}
        }).limit(5)

        return NextResponse.json(communities)

    } catch (error: any) {
        return NextResponse.json({error: 'Something is Wrong.'})
    }
}