'use client';

import BodyLayout from '@/components/LayoutComponent/BodyLayout';
import CardRound from '@/components/RoundGroups/CardRound';
import { useGroups } from '@/hooks/useGroups';
import { useRoundGroups } from '@/hooks/useRoundGroups';
import { Modal, ModalContent, Skeleton, Spinner } from '@nextui-org/react';
import React from 'react';

const Page = () => {
  // const { groups, loading } = useGroups();
  const { roundGroups, loading, error } = useRoundGroups();

  return (
    <div className="h-full w-full relative">
      <div className="h-full px-14 py-8 ">
        <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
          Find Rounds
        </h2>
        <div className="flex flex-wrap gap-4">
          {roundGroups.map((group, index) => (
            <CardRound key={index} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
