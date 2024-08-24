'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { IGroup } from '@/types/types';

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

  const createGroup = async (group: IGroup) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/group', group);

      if (response.status !== 201) {
        setError('Failed to create group');
        return;
      }

      console.log('created group', response.data.group);
      setGroups([...groups, response.data.group]);
      setError(null);
    } catch (err) {
      setError('Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return { groups, loading, error, refetchGroups, createGroup };
};
