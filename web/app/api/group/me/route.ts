import { NextResponse } from 'next/server';
import { getGroupsForUser } from '@/services/groupService';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const groups = await getGroupsForUser(userId);
    return NextResponse.json({ groups }, { status: 200 });
  } catch (error) {
    console.error('Error in retrieving groups:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
