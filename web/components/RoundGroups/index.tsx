'use client';
import { useRoundGroups } from '@/hooks/useRoundGroups';
import React from 'react';
import CardRound from './CardRound';
import { Modal, ModalContent, Spinner } from '@nextui-org/react';

const RoundGroups = () => {
  const { roundGroups, loading, error } = useRoundGroups();

  return (
    <div className="h-full w-full relative">
      <div className="h-full px-14 py-8">
        <div className="text-blueBackground text-5xl h-24 flex items-center mb-2">
          Your Groups
        </div>
        <div className="flex gap-3">
          {roundGroups.map((group, index) => (
            <CardRound key={index} />
          ))}
        </div>
      </div>
      {loading && (
        <Modal isOpen={loading} hideCloseButton>
          <ModalContent className="bg-transparent border-none shadow-none">
            <Spinner />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default RoundGroups;
