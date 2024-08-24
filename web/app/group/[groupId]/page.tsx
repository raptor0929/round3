'use client';

import { GroupDetailProvider } from '@/contexts/GroupDetailContext';
import { useGroupDetail } from '@/hooks/useGroupDetail';
import { useParams } from 'next/navigation';
import React from 'react';

const GroupPageContainer = () => {
  const { group, loading } = useGroupDetail();

  return (
    <div>
      <h1>Group Page</h1>
      <p>Group ID: {group?.id}</p>
    </div>
  );
};

const GroupPage = () => {
  const { groupId } = useParams();
  return (
    <GroupDetailProvider groupId={groupId as string}>
      <GroupPageContainer />
    </GroupDetailProvider>
  );
};

export default GroupPage;
