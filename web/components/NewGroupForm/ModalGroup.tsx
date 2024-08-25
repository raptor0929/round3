import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';
import { useGroups } from '@/hooks/useGroups';

interface ModalGroupProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  groupName: string;
  description: string;
  numberOfMembers: string;
  fundingAmount: string;
  paymentFrequency: 'WEEKLY' | 'MONTHLY';
  isPublic: boolean;
  startDate: string;
  token: string;
}

export default function ModalGroup({
  isOpen,
  onOpenChange,
  groupName,
  description,
  numberOfMembers,
  fundingAmount,
  paymentFrequency,
  isPublic,
  startDate,
  token,
}: ModalGroupProps) {
  const { createGroup } = useGroups();
  const handleSubmitData = () => {
    createGroup({
      title: groupName,
      description: description,
      fundingAmount: Number(fundingAmount),
      maximumMembers: Number(numberOfMembers),
      token: token,
      paymentFrequency: paymentFrequency,
      isPublic: isPublic,
      startDate: startDate,
    });
    // onOpenChange();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="p-4">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2 text-3xl">
              Round Information
            </ModalHeader>
            <ModalBody className="text-lg">
              <p>
                <strong>Name of the group:</strong> {groupName}
              </p>
              <p>
                <strong>Funding Amount:</strong> {fundingAmount}
              </p>
              <p>
                <strong>Number of Members:</strong> {numberOfMembers}
              </p>
              <p>
                <strong>Payment Frequency:</strong> {paymentFrequency}
              </p>
              <p>
                <strong>Type of Group:</strong>{' '}
                {isPublic ? 'Public' : 'Private'}
              </p>
              <p>
                <strong>Start Date:</strong> {startDate}
              </p>
              <p>
                <strong>Token:</strong> {token}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  handleSubmitData();
                  onClose();
                }}
              >
                <Link href="/your-groups">CONFIRM</Link>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
