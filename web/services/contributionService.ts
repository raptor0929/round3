import { prisma } from '@/lib/prisma';
import { createFakeTxHash } from '@/utils/txHash';

export const getContributionsForMember = async (
  groupId: string,
  userId: string
) => {
  const contributions = await prisma.contribution.findMany({
    where: {
      groupMember: {
        groupId,
        userId,
        group: {
          deletedAt: null,
        },
      },
    },
  });

  return contributions;
};

export const getAllContributionsForGroup = async (groupId: string) => {
  const contributions = await prisma.contribution.findMany({
    where: {
      groupMember: {
        groupId,
        group: {
          deletedAt: null,
        },
      },
    },
  });

  return contributions;
};

export const makePayment = async (
  groupId: string,
  userId: string,
  amount: number
) => {
  const membership = await prisma.groupMember.findUnique({
    where: { userId_groupId: { groupId, userId }, group: { deletedAt: null } },
  });

  if (!membership) {
    throw new Error('User is not a member of this group');
  }

  if (membership.amountOwed < amount) {
    throw new Error('User does not owe that much');
  }

  const result = await prisma.$transaction(async (prisma) => {
    const contribution = await prisma.contribution.create({
      data: {
        amount,
        groupMemberId: membership.id,
        transactionHash: createFakeTxHash(),
      },
    });

    await prisma.groupMember.update({
      where: { id: membership.id },
      data: {
        amountOwed: {
          decrement: amount,
        },
      },
    });

    return { contribution };
  });

  return result.contribution;
};
