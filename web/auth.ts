import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByWallet } from './services/userService';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user information in the token
      if (user) {
        token.id = user.id;
        // @ts-expect-error walletAddress is not part of the user type
        token.walletAddress = user.walletAddress;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        // @ts-expect-error walletAddress is not part of the token type
        session.user.walletAddress = token.walletAddress as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt', // Use JWT strategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        walletAddress: {
          label: 'Wallet Address',
          type: 'text',
          placeholder: 'Enter your wallet address',
        },
      },
      async authorize(credentials) {
        if (!credentials?.walletAddress) {
          return null;
        }

        try {
          const user = await findUserByWallet(
            credentials.walletAddress as string
          );
          return user;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null; // Return null if any error occurs
        }
      },
    }),
  ],
});
