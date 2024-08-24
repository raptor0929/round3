import React from 'react';
import { WalletButton } from '../solana/solana-provider';
import { ClusterUiSelect } from '../cluster/cluster-ui';

const NavbarLayout = () => {
  return (
    <div>
      <WalletButton />
      <ClusterUiSelect />
    </div>
  );
};

export default NavbarLayout;
