import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: credentials?.email };
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        console.log(profile);
        return {
          id: profile.sub, // Example: Assuming the 'sub' property is the user's ID
          name: profile.name, // Example: Assuming the 'name' property is the user's name
          email: profile.email, // Example: Assuming the 'email' property is the user's email
          image: profile.picture, // Example: Assuming the 'email' property is the user's email
        };
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
};
