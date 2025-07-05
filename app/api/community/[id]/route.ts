// app/api/community/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/dbConfig'
import { Community } from '@/models/communityModel'
import mongoose from 'mongoose'

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
        }

        await connectDB()
        const community = await Community.findById(id)
            .populate('admin', 'name email')
            .populate('members', 'name')
            .lean()

        if (!community) {
            return NextResponse.json({ error: 'Community not found' }, { status: 404 })
        }

        return NextResponse.json(community)
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}