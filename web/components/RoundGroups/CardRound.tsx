import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  useDisclosure,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Chip,
  Divider,
  Button,
  Image,
} from '@nextui-org/react';
import { IGroup } from '@/types/types';
import TablePayments from './TablePayments';

export default function CardRound({ group }: { group: IGroup }) {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpenChange} className="relative cursor-pointer">
        <Card className="w-[20rem] bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold leading-none text-default-800">
                  {group.title}
                </h3>
                <p className="text-md text-default-600">
                  {group.fundingAmount} {group.token}
                </p>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="px-4 py-2 text-sm text-default-600">
            <p>{group.description}</p>
          </CardBody>
          <CardFooter className="flex justify-between items-center py-3">
            <div className="flex flex-col text-sm text-default-600">
              <p>
                <strong>Frequency:</strong> {group.paymentFrequency}
              </p>
              <p>
                <strong>Members:</strong> {group.maximumMembers}
              </p>
            </div>
          </CardFooter>
          <Chip
            className="absolute top-4 right-4"
            color={
              group.status === 'ACTIVE'
                ? 'success'
                : group.status === 'PENDING'
                ? 'warning'
                : 'default'
            }
            size="sm"
            variant="flat"
          >
            {group.status}
          </Chip>
        </Card>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="rounded-lg shadow-2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="relative p-0 overflow-hidden rounded-t-lg">
                <Image
                  src="/path/to/your/image.jpg"
                  alt="Group Image"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="text-3xl font-bold text-white">
                    {group.title}
                  </h2>
                  <Chip
                    className="mt-2"
                    style={{ color: 'white' }}
                    color={
                      group.status === 'ACTIVE'
                        ? 'success'
                        : group.status === 'PENDING'
                        ? 'warning'
                        : 'default'
                    }
                    size="lg"
                    variant="flat"
                  >
                    {group.status}
                  </Chip>
                </div>
              </ModalHeader>
              <ModalBody className="p-6 space-y-6 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-semibold">
                      Funding Amount:{' '}
                      <span className="font-normal">
                        {group.fundingAmount} {group.token}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Maximum Members:{' '}
                      <span className="font-normal">
                        {group.maximumMembers}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Payment Frequency:{' '}
                      <span className="font-normal">
                        {group.paymentFrequency}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Visibility:{' '}
                      <span className="font-normal">
                        {group.public ? 'Public' : 'Private'}
                      </span>
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-lg font-semibold">
                      Description:{' '}
                      <span className="font-normal">{group.description}</span>
                    </p>
                  </div>
                </div>
                {group.status === 'ACTIVE' && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Payment Schedule
                    </h3>
                    <TablePayments />
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="p-6 bg-gray-50">
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
