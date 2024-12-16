import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      return session;
    }
  }
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  // Remove the admin email check and simply allow any signed-in user
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
    throw 'User not signed in';
  }
}
