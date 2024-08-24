'use client';

import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { IRoundGroup } from '@/types/types';

export interface GroupDetailProviderContextType {
  group: IRoundGroup | null;
}

interface GroupDetailProviderProps {
  children: ReactNode;
  groupId: string;
}

export const GroupDetailProviderContext = createContext<
  GroupDetailProviderContextType | undefined
>(undefined);

export const GroupDetailProvider = ({
  children,
  groupId,
}: GroupDetailProviderProps) => {
  const [group, setGroup] = useState<IRoundGroup | null>(null);

  useEffect(() => {
    const getGroup = async () => {
      const response = await axios.get(`/api/group/${groupId}`);

      if (response.status !== 200) {
        console.error('Error in retrieving group:', response.data);
        setGroup(null);
        return;
      }

      setGroup(response.data.group);
    };

    if (groupId) {
      getGroup();
    }
  }, [groupId]);

  const contextValue: GroupDetailProviderContextType = {
    group,
  };

  return (
    <GroupDetailProviderContext.Provider value={contextValue}>
      {children}
    </GroupDetailProviderContext.Provider>
  );
};
