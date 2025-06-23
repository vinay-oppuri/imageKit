import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/dbConfig'
import User from '@/models/userModel'

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
})

export async function POST(req: NextRequest) {
  await connectDB()

  try {
    const { email }: { email: string } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '15m' })

    await User.findOneAndUpdate(
      { email },
      {
        resetToken: token,
        resetTokenExpiry: Date.now() + 15 * 60 * 1000,
      }
    )

    const resetLink = `${process.env.NEXT_URL}/auth/reset/${token}`

    await transporter.sendMail({
      from: 'oppurivinay@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    })

    return NextResponse.json({ message: 'Reset link sent' }, { status: 200 })

  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}