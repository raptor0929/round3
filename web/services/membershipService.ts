import { prisma } from '@/lib/prisma';
import { findGroupById } from './groupService';
import { GroupMemberRole } from '@prisma/client';

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
    where: { userId_groupId: { groupId, userId }, group: { deletedAt: null } },
  });
};
