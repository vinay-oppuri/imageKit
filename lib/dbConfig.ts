// lib/dbConfig.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose as { conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null }

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'imageKit', // Optional: specify db name here
      bufferCommands: false,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch {
    cached.promise = null
    console.log('connectDB error')
  }

  return cached.conn
}

export default connectDB 