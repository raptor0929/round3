'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGroup, IGroupMembership } from '@/types/types';

interface CreateGroupProps {
  title: string;
  description: string;
  fundingAmount: number;
  maximumMembers: number;
  token: string;
  paymentFrequency: 'WEEKLY' | 'MONTHLY';
  isPublic: boolean;
  startDate: Date | string;
}

export const useGroups = () => {
  const [allGroups, setAllGroups] = useState<IGroup[]>([]);
  const [myGroups, setMyGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refetchGroups();
  }, []);

  const refetchGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/group');

      if (response.status !== 200) {
        setError('Failed to fetch groups');
        return;
      }

      const fetchedGroups = response.data.groups.map((g: any) => g as IGroup);
      const myGroups = fetchedGroups.filter((group: IGroup) =>
        group.members.some((m: IGroupMembership) => m.userId === '1')
      );

      setAllGroups(fetchedGroups);
      setMyGroups(myGroups);
      setError(null);
    } catch (err) {
      setError('Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (
    props: CreateGroupProps
  ): Promise<IGroup | undefined> => {
    try {
      setLoading(true);
      const response = await axios.post('/api/group/create', props);

      if (response.status !== 201) {
        console.error('Failed to create group', response);
        setError(`Failed to create group ${response.status}`);
        return;
      }

      const newGroup = response.data.group as IGroup;

      // optimistic update
      setAllGroups([...allGroups, newGroup]);
      setMyGroups([...myGroups, newGroup]);
      setError(null);

      return newGroup;
    } catch (err) {
      setError('Failed to create group');
    } finally {
      refetchGroups();
      setLoading(false);
    }
  };

  return {
    allGroups,
    myGroups,
    loading,
    error,
    refetchGroups,
    createGroup,
  };
};
