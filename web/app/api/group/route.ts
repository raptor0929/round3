import { NextResponse } from 'next/server';
import { getPublicGroups } from '@/services/groupService';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const groups = await getPublicGroups();
    return NextResponse.json({ groups }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving groups:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
