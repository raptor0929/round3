import { IGroupMembership } from '@/types/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useMembership = (groupId: string) => {
  const [loading, setLoading] = useState(true);
  const [allMemberships, setAllMemberships] = useState<IGroupMembership[]>([]);

  const fetchMemberships = useCallback(async () => {
    try {
      const response = await axios.get(`/api/group/${groupId}/memberships`);

      if (response.status === 200) {
        setAllMemberships(response.data.memberships);
      } else {
        console.error('Error in fetching membership:', response.data);
      }
    } catch (error) {
      console.error('Error in fetching membership:', error);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    console.log('fetching memberships');
    fetchMemberships();
  }, []);

  const joinGroup = useCallback(async () => {
    if (!groupId) return;

    try {
      const response = await axios.post(`/api/group/${groupId}/membership`);

      if (response.status !== 201) {
        console.error('Error in joining group:', response.data);
      } else {
        setAllMemberships([response.data.membership]);
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
        await fetchMemberships();
      }
    } catch (error) {
      console.error('Error in leaving group:', error);
    }
  }, [groupId, fetchMemberships]);

  return { allMemberships, loading, leaveGroup, joinGroup };
};
