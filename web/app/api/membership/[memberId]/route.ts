import { NextResponse } from 'next/server';
import { findGroupMembership } from '@/services/groupService';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string; userId: string } }
) {
  try {
    const groupId = params.groupId;
    const userId = params.userId;

    if (!groupId || !userId) {
      return NextResponse.json(
        { error: 'Group ID and User ID are required' },
        { status: 400 }
      );
    }

    const membership = await findGroupMembership({ groupId, userId });

    if (!membership) {
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ membership }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving group membership:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
