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

interface ModalGroupProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  groupName: string;
  description: string;
  numberOfMembers: string;
  foundingAmount: string;
  paymentFrequency: string;
  typeOfGroup: string;
  startDate: string;
  token: string;
}

export default function ModalGroup({
  isOpen,
  onOpenChange,
  groupName,
  description,
  numberOfMembers,
  foundingAmount,
  paymentFrequency,
  typeOfGroup,
  startDate,
  token,
}: ModalGroupProps) {
  const handleSubmitData = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Group Information
            </ModalHeader>
            <ModalBody>
              <p>
                <strong>Name of the group:</strong> {groupName}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Number of Members:</strong> {numberOfMembers}
              </p>
              <p>
                <strong>Founding Amount:</strong> {foundingAmount}
              </p>
              <p>
                <strong>Payment Frequency:</strong> {paymentFrequency}
              </p>
              <p>
                <strong>Type of Group:</strong> {typeOfGroup}
              </p>
              <p>
                <strong>Start Date:</strong> {startDate}
              </p>
              <p>
                <strong>Token:</strong> {token}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>

              <Button
                color="primary"
                onPress={() => {
                  onClose();
                }}
              >
                <Link href="/your-groups">Confirm</Link>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
