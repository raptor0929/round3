import { IContribution } from '@/types/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useContributions = (groupId: string) => {
  const [groupContributions, setGroupContributions] = useState<IContribution[]>(
    []
  );

  const fetchGroupContributions = useCallback(async () => {
    if (!groupId) return;

    try {
      const response = await axios.get(`/api/group/${groupId}/contributions`);

      if (response.status === 200) {
        setGroupContributions(response.data.contributions);
      } else {
        console.error('Error in fetching contributions:', response.data);
      }
    } catch (error) {
      console.error('Error in fetching contributions:', error);
    }
  }, [groupId]);

  const makePayment = useCallback(
    async (amount: number) => {
      if (!groupId) return;

      try {
        const response = await axios.post(`/api/group/${groupId}/pay`, {
          amount,
        });

        if (response.status !== 201) {
          console.error('Error in making payment:', response.data);
        }
      } catch (error) {
        console.error('Error in making payment:', error);
      }
    },
    [groupId]
  );

  useEffect(() => {
    console.log('fetching Group contributions...');
    fetchGroupContributions();
  }, [fetchGroupContributions]);

  return { makePayment, groupContributions };
};
