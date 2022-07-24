import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "lib/prisma";
import { getUserAuth } from "lib/data.js";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  callbacks: {
    async session({ session }) {
      let userauth = await getUserAuth(session.user.email, prisma);
      if (userauth.length > 0) {
        userauth = JSON.parse(JSON.stringify(userauth));
        session.user.auth = userauth[0].auth;
        session.user.id = userauth[0].id;
      }
      return session;
    },
  },
});
