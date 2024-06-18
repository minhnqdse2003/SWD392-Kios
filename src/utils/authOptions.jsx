import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser, getUserWithGoogle } from "@/server/authAction";

export const authOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const data = await getUser(credentials);
        if (data.status === 404) {
          throw new Error(data.detail);
        }

        return {
          ...credentials,
          name: credentials.email,
          accessToken: data?.value?.token,
          role: data?.value?.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { type } = account;
      const { email } = user;
      const data = await getUserWithGoogle(email);

      if (data.status === 404) {
        throw new Error(data.detail);
      }

      if (type === "oauth") {
        user.role = data?.value?.role;
        user.accessToken = data?.value?.token;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_KEY,
};
