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
  groupPosition: number;
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
  const { userId, groupPosition, ...groupData } = props;
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

  if (groupPosition < 0 || groupPosition >= props.maximumMembers) {
    throw new Error('Invalid group position');
  }

  return prisma.group.create({
    data: {
      ...groupData,
      status: GroupStatus.PENDING,
      nextPaymentDate: startDate,
      members: {
        create: {
          userId: user.id,
          groupPosition,
          role: GroupMemberRole.ADMIN,
        },
      },
    },
  });
};

export const getGroups = async (): Promise<Group[]> => {
  return prisma.group.findMany();
};

export const getGroupsForUser = async (userId: string): Promise<Group[]> => {
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
    where: { id: groupId },
    include: { members: true }, // Include members if needed
  });
};

export const joinGroup = async ({
  groupId,
  userId,
  groupPosition,
}: {
  userId: string;
  groupId: string;
  groupPosition: number;
}) => {
  // Check if the group exists and if the user can join (e.g., max members not reached)
  const group = await findGroupById(groupId);

  if (!group || group.members.length >= group.maximumMembers) {
    throw new Error('Maximum number of members reached');
  }

  // Check if the user is already a member
  const existingMember = await prisma.groupMember.findUnique({
    where: { userId_groupId: { groupId, userId } },
  });

  if (existingMember) {
    throw new Error('User is already a member of this group');
  }

  // Get the groupPositions already assigned to members of group
  const groupPositions = group.members.map((member) => member.groupPosition);
  if (groupPositions.includes(groupPosition)) {
    throw new Error('Group position is already taken');
  }
  if (groupPosition < 0 || groupPosition >= group.maximumMembers) {
    throw new Error('Invalid group position');
  }

  // Add the user as a member of the group
  return await prisma.groupMember.create({
    data: {
      userId,
      groupId,
      groupPosition,
      role: GroupMemberRole.MEMBER,
    },
  });
};

export const leaveGroup = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  // Remove the user from the group
  return await prisma.groupMember.delete({
    where: { userId_groupId: { groupId, userId } },
  });
};

export const findGroupMembership = async ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  return await prisma.groupMember.findUnique({
    where: { userId_groupId: { groupId, userId } },
  });
};
