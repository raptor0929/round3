'use client';
import { useRoundGroups } from '@/hooks/useRoundGroups';
import React from 'react';
import CardRound from './CardRound';
import {
  Modal,
  ModalContent,
  Skeleton,
  Snippet,
  Spinner,
} from '@nextui-org/react';

const RoundGroups = () => {
  const { roundGroups, loading, error } = useRoundGroups();

  return (
    <div className="h-full w-full relative ">
      <div
        className="h-full px-14 py-8"
        // style={{
        //   backgroundImage: `url('./images/fondo01.jpg')`,
        //   filter: 'blur(4px)',
        // }}
      >
        <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
          Your Rounds
        </h2>
        <div className="flex gap-4 flex-wrap">
          {roundGroups.map((group, index) => (
            <CardRound key={index} group={group} />
          ))}
        </div>
      </div>
      <Modal isOpen={loading}>
        <Snippet />
      </Modal>
    </div>
  );
};

export default RoundGroups;
