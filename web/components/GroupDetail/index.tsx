'use client';
import React from 'react';
import { Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useGroupDetail } from '@/hooks/useGroupDetail';
import { PaymentSection } from './PaymentSection';

const GroupDetailContainer = () => {
  const { group, loading } = useGroupDetail();

  // TODO: Alejandro design the UI for this component

  return (
    <div className="h-full w-full relative">
      <div className="h-full px-14 py-8">
        <div className="text-blueBackground text-5xl h-24 flex items-center mb-2">
          {group?.title}
        </div>
        <div className="flex gap-3">{group?.description}</div>
      </div>
      <div className="col-span-2  flex items-center">
        <PaymentSection />
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
