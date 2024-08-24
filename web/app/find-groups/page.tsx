'use client';

import BodyLayout from '@/components/LayoutComponent/BodyLayout';
import { useGroups } from '@/hooks/useGroups';
import React from 'react';

const Page = () => {
  const { groups, loading: loadingGroups } = useGroups();

  return (
    <BodyLayout title="Find Groups">
      {loadingGroups ? (
        <p>Loading groups...</p>
      ) : groups.length === 0 ? (
        <p>No groups found</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>{group.title}</li>
          ))}
        </ul>
      )}
    </BodyLayout>
  );
};

export default Page;
