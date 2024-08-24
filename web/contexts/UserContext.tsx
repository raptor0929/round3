'use client';

import { IUser } from '@/types/types';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { createContext, ReactNode, useEffect, useState, useRef } from 'react';

export interface UserProviderContextType {
  user: IUser | null;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProviderContext = createContext<
  UserProviderContextType | undefined
>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<IUser | null>(null);
  const hasSignedIn = useRef(false); // Track if sign-in has been attempted

  useEffect(() => {
    const address = publicKey?.toString();

    const signIn = async () => {
      if (!address || hasSignedIn.current) {
        return;
      }

      try {
        const response = await axios.post('/api/login', {
          walletAddress: address,
        });

        if (response.status !== 200) {
          console.error('Error in retrieving user:', response.data);
          setUser(null);
          return;
        }

        const { userId, walletAddress } = response.data.user;

        setUser({
          userId,
          walletAddress,
          memberships: [], // Update this as necessary
        });

        hasSignedIn.current = true; // Mark as signed in after successful sign-in
      } catch (error) {
        console.error('Sign-in error:', error);
        setUser(null);
      }
    };

    if (connected && address) {
      signIn();
    } else {
      setUser(null);
      hasSignedIn.current = false; // Reset the flag if the user disconnects
    }
  }, [publicKey, connected]);

  const contextValue: UserProviderContextType = {
    user,
  };

  return (
    <UserProviderContext.Provider value={contextValue}>
      {children}
    </UserProviderContext.Provider>
  );
};
