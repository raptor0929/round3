import { getAllContributionsForGroup } from '@/services/contributionService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const groupId = params.groupId;

    const contributions = await getAllContributionsForGroup(groupId);

    return NextResponse.json({ contributions }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving contributions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
