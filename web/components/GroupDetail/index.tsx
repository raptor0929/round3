'use client';
import React from 'react';
import { Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useGroupDetail } from '@/hooks/useGroupDetail';

const GroupDetailContainer = () => {
  const { group, loading } = useGroupDetail();

  return (
    <div className="h-full w-full relative">
      <div className="h-full px-14 py-8">
        <div className="text-blueBackground text-5xl h-24 flex items-center mb-2">
          {group?.title}
        </div>
        <div className="flex gap-3">{group?.description}</div>
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

export default GroupDetailContainer;