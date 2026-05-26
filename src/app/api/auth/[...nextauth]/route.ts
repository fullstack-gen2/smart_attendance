import NextAuth, { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "istad-iam",
      name: "ISTAD IAM",
      type: "oauth",
      clientId: "acumen-standard",
      clientSecret: "qwerqwer",
      // Use OAuth2 authorize endpoint (handles login + callback flow)
      authorization: {
        url: "https://iam.istad.co/oauth2/authorize",
        params: {
          scope: "openid profile email",
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
        const roles = profile.roles as string[] | undefined;
        const role = profile.role as string | undefined;
        return {
          id: profile.sub as string,
          name: (profile.name ?? profile.preferred_username ?? profile.sub) as string,
          email: (profile.email ?? "") as string,
          image: (profile.picture ?? null) as string | null,
          role: roles?.[0] ?? role ?? "USER",
        };
      },
    },
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        const p = profile as Record<string, unknown>;
        const roles = p.roles as string[] | undefined;
        token.role = roles?.[0] ?? (p.role as string | undefined) ?? token.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      if (session.user) {

        session.user.role = token.role;
      }
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
