import NextAuth, { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/classes",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
