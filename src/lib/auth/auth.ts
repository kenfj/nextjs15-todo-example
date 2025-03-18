import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/lib/auth/auth.config";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // https://authjs.dev/guides/edge-compatibility
  // https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility
  session: { strategy: "jwt" },
  ...authConfig,
  // https://authjs.dev/guides/extending-the-session
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
