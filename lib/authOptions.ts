// lib/authOptions.ts

import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "./dbConfig"
import User from "@/models/userModel"
import { NextResponse } from "next/server"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connectDB()
          const user = await User.findOne({ email: credentials.email })

          if (!user) return null

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) return null

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
          }
        } catch {
          console.error("Authorize error")
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email
      }
      return session
    },

    async signIn({ user }) {
      try {
        console.log("🔐 signIn callback triggered");
        await connectDB();
        console.log("✅ DB connected");

        if (!user.email) {
          console.error("❌ Missing user.email");
          return false;
        }

        const existingUser = await User.findOne({ email: user.email });
        console.log("👤 Existing user:", existingUser);

        if (!existingUser) {
          const newUser = await User.create({
            name: user.name || user.email.split("@")[0],
            email: user.email,
            image: user.image || "",
          });
          console.log("✅ New user created:", newUser);
        }

        return true;

      } catch (error) {
        console.error("🔥 Error in signIn callback:", error);
        return false;
      }
    }


  },

  pages: {
    signIn: "/login",
    error: "/login", // Optional: ?error=CredentialsSignin
  },

  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // 15 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions