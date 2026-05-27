import NextAuth, { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "istad-iam",
      name: "ISTAD IAM",
      type: "oauth",
      clientId: "acumen-standard",
      clientSecret: "qwerqwer",
      authorization: {
        url: "https://iam.istad.co/login",
        params: {
          client_id: "acumen-standard",
          scope: "openid",
          response_type: "code",
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/istad-iam`,
        },
      },
      token: {
        url: "https://iam.istad.co/oauth2/token",
      },
      userinfo: {
        url: "https://iam.istad.co/oauth2/userinfo",
      },
      checks: [],
      profile(profile: Record<string, unknown>) {
        return {
          id: profile.sub as string,
          name: (profile.name ?? profile.preferred_username ?? profile.sub) as string,
          email: (profile.email ?? "") as string,
          image: (profile.picture ?? null) as string | null,
        };
      },
    },
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
