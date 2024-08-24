import { NextResponse } from 'next/server';
import { findGroupById } from '@/services/groupService';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import {
  findGroupMembership,
  joinGroup,
  leaveGroup,
} from '@/services/membershipService';

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const groupId = params.groupId;

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const membership = await findGroupMembership({ groupId, userId });

    return NextResponse.json({ membership }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const groupId = params.groupId;
    const { desiredPosition } = await request.json();

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const group = await findGroupById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const membership = await findGroupMembership({ groupId, userId });
    if (membership) {
      return NextResponse.json(
        { error: 'User is already a member of this group' },
        { status: 400 }
      );
    }

    const newMembership = await joinGroup({
      groupId,
      userId,
      groupPosition: desiredPosition,
    });

    return NextResponse.json({ membership: newMembership }, { status: 201 });
  } catch (error) {
    console.error('Error in joining group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const groupId = params.groupId;

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const membership = await findGroupMembership({ groupId, userId });
    if (!membership) {
      return NextResponse.json(
        { error: 'User is not a member of this group' },
        { status: 400 }
      );
    }

    await leaveGroup({ groupId, userId });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error in leaving group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
