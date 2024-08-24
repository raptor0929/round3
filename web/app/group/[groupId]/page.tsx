'use client';

import GroupDetailContainer from '@/components/GroupDetail';
import { GroupDetailProvider } from '@/contexts/GroupDetailContext';
import { useParams } from 'next/navigation';
import React from 'react';

const GroupPage = () => {
  const { groupId } = useParams();
  return (
    <GroupDetailProvider groupId={groupId as string}>
      <GroupDetailContainer />
    </GroupDetailProvider>
  );
};

export default GroupPage;
