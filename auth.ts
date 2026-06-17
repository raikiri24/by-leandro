import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getMongoClient } from "@/lib/mongodb";

// Lazy config — defers MongoDB connection until the first real request,
// so next build doesn't throw when MONGODB_URI isn't set at build time.
export const { handlers, auth, signIn, signOut } = NextAuth(() => ({
  adapter: MongoDBAdapter(getMongoClient()),
  providers: [Google],
  pages: { signIn: "/" },
}));
