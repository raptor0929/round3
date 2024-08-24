'use client';

import axios from 'axios';
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { IContribution, IGroup, IGroupMembership } from '@/types/types';
import { useContributions } from '@/hooks/useContributions';
import { useMembership } from '@/hooks/useMembership';

export interface GroupDetailProviderContextType {
  group: IGroup | null;
  loading: boolean;
  membership: IGroupMembership | null;
  groupContributions: IContribution[];
  makePayment: (amount: number) => Promise<void>;
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

  const { makePayment, groupContributions } = useContributions(groupId);
  const { membership } = useMembership(groupId);

  const getGroup = useCallback(async () => {
    if (!groupId) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/group/${groupId}`);

      if (response.status !== 200) {
        console.error('Error in retrieving group:', response.data);
        setGroup(null);
      } else {
        setGroup(response.data.group);
      }
    } catch (error) {
      console.error('Error in retrieving group:', error);
      setGroup(null);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  const contextValue: GroupDetailProviderContextType = {
    group,
    loading,
    membership,
    groupContributions,

    makePayment,
  };

  return (
    <GroupDetailProviderContext.Provider value={contextValue}>
      {children}
    </GroupDetailProviderContext.Provider>
  );
};
