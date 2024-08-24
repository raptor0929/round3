import { useContext } from 'react';

import {
  UserProviderContext,
  UserProviderContextType,
} from '@/contexts/UserContext';

export const useUser = (): UserProviderContextType => {
  const context = useContext(UserProviderContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
