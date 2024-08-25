'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGroup } from '@/types/types';

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
  const [groups, setGroups] = useState<IGroup[]>([]);
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

      setGroups(fetchedGroups);
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

      const group = response.data.group as IGroup;

      // optimistic update
      setGroups([...groups, group]);
      setError(null);

      return group;
    } catch (err) {
      setError('Failed to create group');
    } finally {
      refetchGroups();
      setLoading(false);
    }
  };

  return { groups, loading, error, refetchGroups, createGroup };
};
