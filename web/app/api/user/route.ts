import { NextResponse } from 'next/server';
import { createOrGetUser, findUserByWallet } from '@/services/userService';

export async function POST(request: Request) {
  try {
    const { walletAddress }: { walletAddress: string } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await findUserByWallet(walletAddress);

    // If not, create a new user
    if (!user) {
      user = await createOrGetUser({ walletAddress });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await findUserByWallet(walletAddress);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
