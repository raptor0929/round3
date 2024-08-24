import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createOrGetUser, findUserByWallet } from './services/userService';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        walletAddress: {
          label: 'Wallet Address',
          type: 'text',
          placeholder: '',
        },
      },
      authorize: async (credentials) => {
        let user = null;

        user = await createOrGetUser({
          walletAddress: credentials.walletAddress as string,
        });

        if (!user) {
          throw new Error('User not found.');
        }

        return user;
      },
    }),
  ],
});
