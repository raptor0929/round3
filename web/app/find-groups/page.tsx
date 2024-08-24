'use client';

import BodyLayout from '@/components/LayoutComponent/BodyLayout';
import { useGroups } from '@/hooks/useGroups';
import { Modal, ModalContent, Spinner } from '@nextui-org/react';
import { Web3Token } from '@prisma/client';
import React, { useEffect } from 'react';

const Page = () => {
  const {
    groups,
    loading: loadingGroups,
    refetchGroups,
    createGroup,
  } = useGroups();

  useEffect(() => {
    refetchGroups();
  }, []);

  return (
    <BodyLayout title="Find Groups">
      {!loadingGroups && groups.length === 0 ? (
        <p>No groups found</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>{group.title}</li>
          ))}
        </ul>
      )}
      {loadingGroups && (
        <Modal isOpen={loadingGroups} hideCloseButton>
          <ModalContent className="bg-transparent border-none shadow-none">
            <Spinner />
          </ModalContent>
        </Modal>
      )}
    </BodyLayout>
  );
};

export default Page;
