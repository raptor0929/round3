import { NextResponse } from 'next/server';
import { joinGroup } from '@/services/membershipService';

export async function POST(request: Request) {
  try {
    const { groupId, userId, desiredPosition } = await request.json();

    if (!groupId || !userId || !desiredPosition) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }

    const groupMember = await joinGroup({
      groupId,
      userId,
      groupPosition: desiredPosition,
    });

    return NextResponse.json({ groupMember }, { status: 200 });
  } catch (error) {
    console.error('Error in joining group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
