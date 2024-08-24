import { IGroupMembership } from '@/types/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useMembership = (groupId: string) => {
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState<IGroupMembership | null>(null);

  useEffect(() => {
    const fetchMembership = async () => {
      console.log('Fetching membership for group:', groupId);
      try {
        const response = await axios.get(`/api/group/${groupId}/membership`);

        if (response.status === 200) {
          setMembership(response.data.membership);
        } else {
          console.error('Error in fetching membership:', response.data);
        }
      } catch (error) {
        console.error('Error in fetching membership:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, [groupId]);

  const joinGroup = useCallback(async () => {
    if (!groupId) return;

    try {
      const response = await axios.post(`/api/group/${groupId}/membership`);

      if (response.status !== 201) {
        console.error('Error in joining group:', response.data);
      } else {
        setMembership(response.data.membership);
      }
    } catch (error) {
      console.error('Error in joining group:', error);
    }
  }, [groupId]);

  const leaveGroup = useCallback(async () => {
    if (!groupId) return;

    try {
      const response = await axios.delete(`/api/group/${groupId}/membership`);

      if (response.status !== 200) {
        console.error('Error in leaving group:', response.data);
      } else {
        setMembership(null);
      }
    } catch (error) {
      console.error('Error in leaving group:', error);
    }
  }, [groupId]);

  return { membership, loading, leaveGroup, joinGroup };
};
