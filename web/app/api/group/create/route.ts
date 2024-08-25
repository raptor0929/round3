import { NextResponse } from 'next/server';
import { createGroup } from '@/services/groupService';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      title,
      description,
      maximumMembers,
      fundingAmount,
      paymentFrequency,
      isPublic,
      token,
    } = await request.json();

    if (
      !title ||
      !fundingAmount ||
      !maximumMembers ||
      !paymentFrequency ||
      !token ||
      isPublic === undefined
    ) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const group = await createGroup({
      token,
      title,
      userId,
      description,
      fundingAmount,
      maximumMembers,
      paymentFrequency,
      public: isPublic,
      startDate: new Date(),
      groupContractAddress: '0x0', // TODO: Get contract address
    });

    return NextResponse.json({ group }, { status: 201 });
  } catch (error) {
    console.error('Error in creating group:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
