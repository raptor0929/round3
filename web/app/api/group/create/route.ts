import { NextResponse } from 'next/server';
import { createGroup } from '@/services/groupService';

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      maximumMembers,
      fundingAmount,
      paymentFrequency,
      public: isPublic,
      startDate,
      groupContractAddress,
      token,
      groupPosition,
    } = await request.json();

    if (
      !title ||
      !fundingAmount ||
      !maximumMembers ||
      !startDate ||
      !groupContractAddress ||
      !groupPosition
    ) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const group = await createGroup({
      title,
      description,
      maximumMembers,
      fundingAmount,
      paymentFrequency,
      public: isPublic,
      startDate,
      groupContractAddress,
      token,
      groupPosition,
      userId: '1', // TODO: Get user ID from session
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
