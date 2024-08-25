import { auth } from '@/auth';
import { findAllMembershipsForGroup } from '@/services/membershipService';
import { NextRequest, NextResponse } from 'next/server';

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

    const memberships = await findAllMembershipsForGroup({ groupId });

    return NextResponse.json({ memberships }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
