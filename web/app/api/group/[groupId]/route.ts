import { NextResponse } from 'next/server';
import { findGroupById } from '@/services/groupService';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const groupId = params.groupId;

    if (!groupId) {
      return NextResponse.json(
        { error: 'Group ID is required' },
        { status: 400 }
      );
    }

    const group = await findGroupById(groupId);

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json({ group }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
