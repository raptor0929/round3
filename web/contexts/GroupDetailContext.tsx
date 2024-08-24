'use client';

import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { IGroup } from '@/types/types';

export interface GroupDetailProviderContextType {
  group: IGroup | null;
  loading: boolean;
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
  const [group, setGroup] = useState<IGroup | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGroup = async () => {
      setLoading(true);
      const response = await axios.get(`/api/group/${groupId}`);

      if (response.status !== 200) {
        console.error('Error in retrieving group:', response.data);
        setGroup(null);
        return;
      }

      setGroup(response.data.group);
      setLoading(false);
    };

    if (groupId) {
      getGroup();
    }
  }, [groupId]);

  const contextValue: GroupDetailProviderContextType = {
    group,
    loading,
  };

  return (
    <GroupDetailProviderContext.Provider value={contextValue}>
      {children}
    </GroupDetailProviderContext.Provider>
  );
};
