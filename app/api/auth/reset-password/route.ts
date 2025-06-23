import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/dbConfig'
import User from '@/models/userModel'

export async function POST(req: NextRequest) {
  await connectDB()
  const { token, password }: { token: string; password: string } = await req.json()

  if (!token || !password) {
    return NextResponse.json({ error: 'Token and password required' }, { status: 400 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string }

    const user = await User.findOne({ email: decoded.email, resetToken: token })

    if (!user) {
      return NextResponse.json({ error: 'Invalid token or user not found' }, { status: 400 })
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 })
    }

    // Check if new password is same as the current one
    const isSamePassword = await bcrypt.compare(password, user.password)
    if (isSamePassword) {
      return NextResponse.json({ error: 'New password must be different from the old password' }, { status: 400 })
    }

    // Assign new plain password; pre-save hook will hash it
    user.password = password
    user.resetToken = null
    user.resetTokenExpiry = null
    await user.save()

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }
}