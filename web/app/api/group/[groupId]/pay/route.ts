import { auth } from '@/auth';
import { makePayment } from '@/services/contributionService';
import { findGroupMembership } from '@/services/membershipService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const groupId = params.groupId;
    const { amount } = await request.json();

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const membership = await findGroupMembership({ groupId, userId });
    if (!membership) {
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      );
    }

    const payment = await makePayment(groupId, userId, amount);

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    console.error('Error in joining group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
