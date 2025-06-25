import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
    },
})

export async function POST(req: NextRequest) {
    
    try {
        const {name, mail, message} = await req.json()
        transporter.sendMail({
            from: `"${name}" <${mail}>`,
            to: 'oppurivinay25@gmail.com',
            subject: 'A Mail from Clipo User',
            html: `<p>This mail is from ${name}.</p><p>Message: </p><p>${message}</p>`
        })

        return NextResponse.json({message: 'Message sent successfully.'})
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    // when admin wants to save mails in database
    // try {
    //     await connectDB()

    //     const { name, email, message } = await req.json()
    //     const res = await Contact.create({ name, email, message })
    //     await res.save()

    //     return NextResponse.json({message: 'Message sent successfully'})
    // } catch (error: any) {
    //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    // }
}