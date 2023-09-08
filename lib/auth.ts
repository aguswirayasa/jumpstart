import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prismadb from "./prismadb";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
interface User {
  id: string;
  email: string;
  role: string; // Ensure 'role' property is defined
  // Other properties...
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3600,
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
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prismadb.users.findUnique({
          where: { email: credentials.email },
        });
        prismadb.$disconnect;
        if (!user) {
          return null;
        }
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }
        if (!user.active) {
          throw new Error(`INACTIVE_USER:${user.id}`);
        }

        return {
          id: user.id + "",
          role: user.role,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          image: user.avatarUrl,
          username: user.firstName + " " + user.lastName,
          emails: user.email,
          avatar: user.avatarUrl,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        let user = await prismadb.users.findFirst({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          const hashedPassword = await bcrypt.hash(profile.name, 12);
          user = await prismadb.users.create({
            data: {
              email: profile.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              active: true,
              avatarUrl: profile.picture,
              password: hashedPassword,
            },
          });
        }
        prismadb.$disconnect;
        return {
          id: user.id, // Example: Assuming the 'sub' property is the user's ID
          role: user.role,
          name: user.firstName + " " + user.lastName, // Example: Assuming the 'name' property is the user's name
          email: user.email, // Example: Assuming the 'email' property is the user's email
          image: user.avatarUrl, // Example: Assuming the 'email' property is the user's email
          username: user.firstName + " " + user.lastName,
          emails: user.email,
          avatar: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
