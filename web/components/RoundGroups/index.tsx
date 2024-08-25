'use client';

import React from 'react';
import CardRound from './CardRound';
import { Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useGroups } from '@/hooks/useGroups';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

const RoundGroups = () => {
  const { myGroups, loading } = useGroups();
  const { connected } = useWallet();

  return (
    <div className="h-screen w-full overflow-scroll mb-10">
      <div className="h-full px-14 py-8">
        <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
          Your Rounds
        </h2>
        {connected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGroups.map((group) => (
              <CardRound key={group.id} group={group} isYourRounds={false} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
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

export default RoundGroups;
