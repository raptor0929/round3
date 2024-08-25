// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import Round3IDL from '../target/idl/round3.json';
import type { Round3 } from '../target/types/round3';

// Re-export the generated IDL and type
export { Round3, Round3IDL };

// The programId is imported from the program IDL.
export const ROUND3_PROGRAM_ID = new PublicKey(Round3IDL.metadata.address);

// This is a helper function to get the Round3 Anchor program.
export function getRound3Program(provider: AnchorProvider) {
  return new Program(Round3IDL as Round3, provider);
}

// This is a helper function to get the program ID for the Round3 program depending on the cluster.
export function getRound3ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return ROUND3_PROGRAM_ID;
  }
}
