import prisma from '@/lib/prisma';
import {
  Group,
  GroupMemberRole,
  GroupStatus,
  PaymentFrequency,
  Web3Token,
} from '@prisma/client';

interface CreateGroupProps {
  userId: number;
  title: string;
  public: boolean;
  token: Web3Token;
  description?: string;
  fundingAmount: number;
  maximumMembers: number;
  startDate: Date | string;
  groupContractAddress: string;
  paymentFrequency: PaymentFrequency;
}

/**
 * Creates a new group with the specified properties.
 * @param props - Properties for creating a new group.
 * @returns The created group.
 * @throws If the user is not found.
 */
export const createGroup = async (props: CreateGroupProps): Promise<Group> => {
  const { userId, ...groupData } = props;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found to create group');
  }

  const startDate = new Date(props.startDate);
  if (isNaN(startDate.getTime())) {
    throw new Error('Invalid start date');
  }

  return prisma.group.create({
    data: {
      ...groupData,
      status: GroupStatus.PENDING,
      nextPaymentDate: startDate,
      members: {
        create: {
          userId: user.id,
          role: GroupMemberRole.ADMIN,
          memberWalletAddress: user.walletAddress,
        },
      },
    },
  });
};

export const getGroups = async (): Promise<Group[]> => {
  return prisma.group.findMany();
};

export const getGroupsForUser = async (userId: number): Promise<Group[]> => {
  return prisma.group.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });
};
