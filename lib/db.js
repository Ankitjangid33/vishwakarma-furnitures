import mongoose from 'mongoose';

/**
 * MongoDB connection helper.
 * Vercel serverless me har request pe naya connection na bane —
 * isliye connection ko global cache me rakhte hain.
 */

const MONGODB_URI = process.env.MONGODB_URI;

let cached = globalThis._vfMongoose;

if (!cached) {
  cached = globalThis._vfMongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI missing. .env.local me MongoDB Atlas ka connection string daalein.');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 15000
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

/** Mongoose document ko plain JSON me badalta hai (client components ke liye) */
export function toPlain(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export default connectDB;
