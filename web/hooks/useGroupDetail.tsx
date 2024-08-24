import { useContext } from 'react';

import {
  GroupDetailProviderContext,
  GroupDetailProviderContextType,
} from '@/contexts/GroupDetailContext';

export const useGroupDetail = (): GroupDetailProviderContextType => {
  const context = useContext(GroupDetailProviderContext);
  if (!context) {
    throw new Error('useGroupDetail must be used within a GroupDetailProvider');
  }
  return context;
};
