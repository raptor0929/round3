import { IContribution } from '@/types/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useContributions = (groupId: string) => {
  const [loading, setLoading] = useState(false);
  const [groupContributions, setGroupContributions] = useState<IContribution[]>(
    []
  );

  const fetchGroupContributions = useCallback(async () => {
    if (!groupId) return;

    try {
      setLoading(true);
      const response = await axios.get(`/api/group/${groupId}/contributions`);

      if (response.status === 200) {
        setGroupContributions(response.data.contributions);
      } else {
        console.error('Error in fetching contributions:', response.data);
      }
    } catch (error) {
      console.error('Error in fetching contributions:', error);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const makePayment = useCallback(
    async (amount: number) => {
      if (!groupId) return;

      try {
        setLoading(true);
        const response = await axios.post(`/api/group/${groupId}/pay`, {
          amount,
        });

        if (response.status !== 201) {
          console.error('Error in making payment:', response.data);
        }

        await fetchGroupContributions();
      } catch (error) {
        console.error('Error in making payment:', error);
      } finally {
        setLoading(false);
      }
    },
    [groupId]
  );

  useEffect(() => {
    fetchGroupContributions();
  }, []);

  return { makePayment, groupContributions, loading };
};
