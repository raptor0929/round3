import { useState, useEffect } from 'react';
import { IRoundGroup } from '@/types/types';
import { roundGroupsData } from '@/data/data';

export const useRoundGroups = () => {
  const [roundGroups, setRoundGroups] = useState<IRoundGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoundGroups = async () => {
    try {
      setLoading(true);
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
      setRoundGroups(roundGroupsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch round groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoundGroups();
  }, []);

  return { roundGroups, loading, error };
};
