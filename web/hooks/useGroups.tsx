'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IGroup, IGroupMembership } from '@/types/types';
import { auth } from '@/auth';

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
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      refetchMyGroups();
    }
  }, [userId]);

  useEffect(() => {
    refetchAllGroups();
  }, []);

  const refetchMyGroups = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.get('/api/group/me');

      if (response.status !== 200) {
        setError('Failed to fetch my groups');
        return;
      }

      const myGroups = response.data.groups.map((g: any) => g as IGroup);
      setMyGroups(myGroups);
      setError(null);
    } catch (err) {
      setError('Failed to fetch my groups');
    } finally {
      setLoading(false);
    }
  };

  const refetchAllGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/group');

      if (response.status !== 200) {
        setError('Failed to fetch groups');
        return;
      }

      const fetchedGroups = response.data.groups.map((g: any) => g as IGroup);

      setAllGroups(fetchedGroups);
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
      refetchMyGroups();
      refetchAllGroups();
      setLoading(false);
    }
  };

  return {
    allGroups,
    myGroups,
    loading,
    error,
    createGroup,
    refetchMyGroups,
    refetchAllGroups,
  };
};
