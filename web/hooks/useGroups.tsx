'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGroup } from '@/types/types';

export const useGroups = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetchGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/group');

      if (response.status !== 200) {
        setError('Failed to fetch groups');
        return;
      }

      console.log('groups', response.data.groups);
      const fetchedGroups = response.data.groups.map((g: any) => g as IGroup);

      setGroups(fetchedGroups);
      setError(null);
    } catch (err) {
      setError('Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchGroups();
  }, []);

  return { groups, loading, error, refetchGroups };
};
