import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        try {
          const response = await axios.post('/api/user', {
            walletAddress: credentials?.walletAddress,
          });

          if (response.status === 200) {
            return response.data.user;
          }

          return null; // Return null if user data is not found
        } catch (error) {
          console.error('Error during authorization:', error);
          return null; // Return null if any error occurs
        }
      },
    }),
  ],
});
