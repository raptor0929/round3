import React from 'react';
import { WalletButton } from '../solana/solana-provider';
import { ClusterUiSelect } from '../cluster/cluster-ui';

const NavbarLayout = () => {
  return (
    <div className="flex flex-row-reverse h-full items-center px-10 ">
      <div className="flex gap-2">
        <WalletButton />
        <ClusterUiSelect />
      </div>
    </div>
  );
};

export default NavbarLayout;
