import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export function getMongoClient() {
  if (cachedClient) return Promise.resolve(cachedClient);

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(mongoUri).connect().then((client) => {
      cachedClient = client;
      return client;
    });
  }

  return clientPromise;
}

export async function getAppDatabase() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB || "byleandro");
}
