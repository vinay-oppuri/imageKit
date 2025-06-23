import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import connectDB from '@/lib/dbConfig'

export async function POST(request: NextRequest) {
  await connectDB()

  try {
    const {
      username,
      email,
      password,
    }: { username?: string; email: string; password: string } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Enter email and password' },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already registered' },
        { status: 400 }
      )
    }

    const newUser = await User.create({ username, email, password })
    const savedUser = await newUser.save()

    return NextResponse.json({
      message: 'User registered successfully',
      success: true,
      savedUser,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}