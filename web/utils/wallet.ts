import { PublicKey } from '@solana/web3.js';

/**
 * Validates whether a given string is a valid Solana wallet address.
 * @param address - The wallet address to validate.
 * @returns True if the address is valid, false otherwise.
 */
export const isValidWalletAddress = (address: string): boolean => {
  try {
    // Attempt to create a PublicKey with the address
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};
