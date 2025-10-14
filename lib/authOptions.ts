import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          // If user doesn't exist, create one
          if (!dbUser) {
            // Generate a random username from email
            const username = user.email!.split("@")[0] + Math.floor(Math.random() * 1000);
            
            dbUser = await prisma.user.create({
              data: {
                email: user.email!,
                username: username,
                name: user.name || null,
                avatarUrl: user.image || null,
                password: "", // No password for OAuth users
              },
            });
          } else {
            // Update user info if changed
            await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                name: user.name || dbUser.name,
                avatarUrl: user.image || dbUser.avatarUrl,
              },
            });
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

