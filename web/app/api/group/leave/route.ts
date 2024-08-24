import { NextResponse } from 'next/server';
import { leaveGroup } from '@/services/groupService';

export async function DELETE(request: Request) {
  try {
    const { groupId, userId } = await request.json();

    if (!groupId || !userId) {
      return NextResponse.json(
        { error: 'Group ID and Wallet Address are required' },
        { status: 400 }
      );
    }

    const result = await leaveGroup({ groupId, userId });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to leave the group or user not found in the group' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error in leaving group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
