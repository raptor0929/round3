'use client';

import { IUser } from '@/types/types';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

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

  useEffect(() => {
    const address = publicKey?.toString();

    const signIn = async () => {
      if (!address) {
        setUser(null);
        return;
      }

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
        memberships: [],
      });
    };

    if (connected && address) {
      signIn();
    } else {
      setUser(null);
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
