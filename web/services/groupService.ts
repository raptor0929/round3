import { prisma } from '@/lib/prisma';
import {
  Group,
  GroupMemberRole,
  GroupStatus,
  PaymentFrequency,
  Web3Token,
} from '@prisma/client';

interface CreateGroupProps {
  userId: string;
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
  const { userId, fundingAmount, ...groupData } = props;
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
      fundingAmount,
      status: GroupStatus.PENDING,
      nextPaymentDate: startDate,
      members: {
        create: {
          userId: user.id,
          groupPosition: 0,
          amountOwed: fundingAmount,
          role: GroupMemberRole.ADMIN,
        },
      },
    },
  });
};

export const getPublicGroups = async (): Promise<Group[]> => {
  return prisma.group.findMany({
    where: {
      public: true,
      deletedAt: null,
    },
  });
};

export const getGroupsForUser = async (userId: string): Promise<Group[]> => {
  return prisma.group.findMany({
    where: {
      deletedAt: null,
      members: {
        some: {
          userId,
        },
      },
    },
  });
};

/**
 * Update a group's next payment date.
 * @param groupId - The ID of the group to update.
 * @param nextPaymentDate - The new next payment date.
 * @returns The updated group.
 */
export const updateGroupNextPaymentDate = async (
  groupId: string,
  nextPaymentDate: Date
): Promise<Group> => {
  return prisma.group.update({
    where: { id: groupId },
    data: { nextPaymentDate },
  });
};

export const findGroupById = async (groupId: string) => {
  return await prisma.group.findUnique({
    where: { id: groupId, deletedAt: null },
    include: { members: true }, // Include members if needed
  });
};
