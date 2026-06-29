import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID!,
    clientSecret: process.env.AUTH_GITHUB_SECRET!,
    authorization: {
      params: {
        scope: "read:user repo",
      },
    },
  }),
],

callbacks: {
  async jwt({ token, account, profile }) {
    if (account) {
      token.accessToken = account.access_token;
    }

    if (profile) {
      token.login = profile.login;
    }

    return token;
  },

  async session({ session, token }) {
    session.user.username = token.login as string;

    return session;
  },
},
});