import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const mongoClient =
  globalForMongo._mongoClient ?? new MongoClient(mongoUri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = mongoClient;
}

const db = mongoClient.db(process.env.DB_NAME || "humanova");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt(), nextCookies()],
});
