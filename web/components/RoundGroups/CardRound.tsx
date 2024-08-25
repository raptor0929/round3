import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Chip,
  Divider,
} from '@nextui-org/react';
import { IRoundGroup } from '@/types/types';
import Link from 'next/link';
import TablePayments from './TablePayments';

export default function CardRound({ group }: { group: IRoundGroup }) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="max-w-[20rem] bg-white p-4">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h5 className=" font-semibold leading-none text-default-600">
                {group.name}
              </h5>
              <h3 className="text-small tracking-tight text-default-400">
                {group.amount} {group.coin}
              </h3>
            </div>
          </div>
          <Button
            className={
              isOpen ? 'bg-transparent text-foreground border-default-200' : ''
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isOpen ? 'bordered' : 'solid'}
            onPress={() => onOpenChange()}
          >
            See Details
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{group.description}</p>
          {/* <span className="pt-2">
          <span className="py-2" aria-label="computer" role="img"></span>
        </span> */}
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p>Frequency: {group.frequency}</p>
          </div>
        </CardFooter>
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={'2xl'}
        className=""
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 text-3xl justify-between items-center">
                {group.name}
                <Chip
                  color={
                    group.status === 'RUNNING'
                      ? 'success'
                      : group.status === 'WAITING'
                      ? 'warning'
                      : 'default'
                  }
                >
                  {group.status}
                </Chip>
              </ModalHeader>
              <Divider />
              <ModalBody className="text-lg">
                <p>
                  <strong>Funding Amount:</strong> {group.amount}
                </p>
                <p>
                  <strong>Number of Members:</strong> {group.numberOfMembers}
                </p>
                <p>
                  <strong>Payment Frequency:</strong> {group.frequency}
                </p>
                <p>
                  <strong>Type of Group:</strong>{' '}
                  {group.type === 'PUBLIC' ? 'Public' : 'Private'}
                </p>
                <p>
                  <strong>Start Date:</strong> {group.startDate}
                </p>
                <p>
                  <strong>Token:</strong> {group.coin}
                </p>
                <p>
                  <strong>Description:</strong> {group.description}
                </p>
                {group.status === 'RUNNING' && <TablePayments />}
              </ModalBody>
              <ModalFooter>
                {/* <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                  }}
                >
                  <Link href="/your-groups">CONFIRM</Link>
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
