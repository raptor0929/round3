import React from 'react';
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
import { IGroup } from '@/types/types';
import TablePayments from './TablePayments';

export default function CardRound({ group }: { group: IGroup }) {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="max-w-[20rem] bg-white p-4">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h5 className=" font-semibold leading-none text-default-600">
                {group.title}
              </h5>
              <h3 className="text-small tracking-tight text-default-400">
                {group.fundingAmount} {group.token}
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
            <p>Frequency: {group.paymentFrequency}</p>
          </div>
        </CardFooter>
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={'2xl'}
        className=""
      >
        <ModalContent className="pt-2">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 text-3xl justify-between items-center">
                {group.title}
                <Chip
                  style={{ color: 'white' }}
                  color={
                    group.status === 'ACTIVE'
                      ? 'success'
                      : group.status === 'PENDING'
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
                  <strong>Funding Amount:</strong> {group.fundingAmount}
                </p>
                <p>
                  <strong>Maximum Number of Members:</strong>{' '}
                  {group.maximumMembers}
                </p>
                <p>
                  <strong>Payment Frequency:</strong> {group.paymentFrequency}
                </p>
                <p>
                  <strong>Visibility:</strong>{' '}
                  {group.public ? 'Public' : 'Private'}
                </p>
                <p>
                  <strong>Start Date:</strong> {group.startDate}
                </p>
                <p>
                  <strong>Token:</strong> {group.token}
                </p>
                <p>
                  <strong>Description:</strong> {group.description}
                </p>
                {group.status === 'ACTIVE' && <TablePayments />}
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
