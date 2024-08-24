import { useRoundGroups } from '@/hooks/useRoundGroups';
import React from 'react';
import CardRound from './CardRound';
import { Modal, Spinner } from '@nextui-org/react';

const RoundGroups = () => {
  const { roundGroups, loading, error } = useRoundGroups();

  //   if (error) return <div>Error: {error}</div>;
  if (loading)
    return (
      <Modal isOpen={loading} className="bg-black absolute" backdrop="opaque">
        <Spinner />
      </Modal>
    );
  return (
    <div className="h-full w-full bg-primaryHover">
      <Modal isOpen={true} backdrop="transparent">
        <Spinner />
        hola
      </Modal>
      {/* <div className="h-full px-14 py-8">
        <div className="text-blueBackground text-5xl h-24 flex items-center mb-2">
          Your Groups
        </div>
        <div className="flex gap-3">
          {roundGroups.map((group, index) => (
            <CardRound key={index} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default RoundGroups;
