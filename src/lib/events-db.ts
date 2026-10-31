// Server-only MongoDB helper for upcoming events using MongoDB's .limit() operator.
import { MongoClient } from "mongodb";
import type { CommunityEvent } from "@/types/event";
import { todayString } from "@/lib/utils";

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "humanovaDB";

let client: MongoClient | null = null;

async function getDb() {
  if (!mongoUri) return null;
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
  }
  return client.db(dbName);
}

/**
 * Fetches upcoming events directly from MongoDB using .limit() operator.
 * Filters events where eventDate >= today, sorts by eventDate ascending (nearest first),
 * and applies .limit(count).
 */
export async function getUpcomingEventsFromDb(count = 6): Promise<CommunityEvent[]> {
  try {
    const db = await getDb();
    if (!db) return [];

    const today = todayString();
    const docs = await db
      .collection("events")
      .find({ eventDate: { $gte: today } })
      .sort({ eventDate: 1 })
      .limit(count)
      .toArray();

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      title: String(doc.title || ""),
      description: String(doc.description || ""),
      eventType: doc.eventType,
      thumbnail: String(doc.thumbnail || ""),
      location: String(doc.location || ""),
      eventDate: String(doc.eventDate || ""),
      creatorEmail: String(doc.creatorEmail || ""),
      creatorName: doc.creatorName ? String(doc.creatorName) : undefined,
    }));
  } catch (err) {
    console.error("Direct MongoDB query error:", err);
    return [];
  }
}
