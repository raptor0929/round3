'use client';

import CardRound from '@/components/RoundGroups/CardRound';
import { useGroups } from '@/hooks/useGroups';
import React from 'react';

const Page = () => {
  const { allGroups } = useGroups();

  return (
    <div className="h-full w-full relative">
      <div className="h-full px-14 py-8 ">
        <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
          Find Rounds
        </h2>
        <div className="flex flex-wrap gap-4">
          {allGroups.map((group, index) => (
            <CardRound key={index} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
