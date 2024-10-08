'use client';

import CardRound from '@/components/RoundGroups/CardRound';
import { WalletButton } from '@/components/solana/solana-provider';
import { useGroups } from '@/hooks/useGroups';
import { Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';

const Page = () => {
  const { allGroups, loading } = useGroups();
  const { connected } = useWallet();

  return (
    <div className="h-screen w-full overflow-scroll mb-10">
      <div className="h-full px-14 py-8">
        <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
          Find Rounds
        </h2>
        {connected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGroups.map((group) => (
              <CardRound key={group.id} group={group} isYourRounds={true} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <WalletButton className="w-full bg-primaryOutline text-white py-6">
              Connect Wallet
            </WalletButton>
          </div>
        )}
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

export default Page;
