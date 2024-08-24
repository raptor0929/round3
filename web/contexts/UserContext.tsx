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

    const getUser = async () => {
      if (!address) {
        setUser(null);
        return;
      }

      const response = await axios.post('/api/user', {
        walletAddress: address,
      });

      if (response.status !== 200) {
        console.error('Error in retrieving user:', response.data);
        setUser(null);
        return;
      }

      console.log('setting user', response.data.user);
      setUser(response.data.user);
    };

    if (connected && address) {
      getUser();
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
