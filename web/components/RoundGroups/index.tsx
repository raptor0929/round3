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
    <div className="h-full w-full relative ">
      <div
        className="h-full px-14 py-8"
        // style={{
        //   backgroundImage: `url('./images/fondo01.jpg')`,
        //   filter: 'blur(4px)',
        // }}
      >
        <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
          Your Rounds
        </h2>
        {connected ? (
          <div className="flex gap-4 flex-wrap">
            {myGroups.map((group) => (
              <CardRound key={group.id} group={group} />
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
