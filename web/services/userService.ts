import { prisma } from '@/lib/prisma';
import { isValidWalletAddress } from '@/utils/wallet';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface CreateUserProps {
  walletAddress: string;
}

/**
 * Create a user
 * @param props Props to create a user
 * @returns User
 */
export const createOrGetUser = async (
  props: CreateUserProps
): Promise<User> => {
  if (!isValidWalletAddress(props.walletAddress)) {
    throw new Error('Invalid wallet address format.');
  }

  try {
    return prisma.user.create({
      data: props,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('A user with this wallet address already exists.');
      }
    }
    throw error;
  }
};

/**
 * Find a user by their wallet address
 * @param walletAddress
 * @returns User | null
 */
export const findUserByWallet = async (
  walletAddress: string
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { walletAddress },
  });
};
