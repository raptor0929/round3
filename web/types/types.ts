export interface IMembers {
  walletMemberId: string;
  position: number;
}

export interface IRoundGroup {
  groupId: string;
  name: string;
  amount: number;
  numberOfMembers: number;
  frequency: string;
  coin: 'USDC' | 'BTC' | 'SOL';
  startDate: string;
  type: 'PRIVATE' | 'PUBLIC';
  members: IMembers[];
  status: 'RUNNING' | 'WAITING' | 'ENDING';
  description?: string;
}

export interface IGroup {
  id: string;
  title: string;
  description: string | null;
  members: IGroupMembership[];
  maximumMembers: number;
  fundingAmount: number;
  nextPaymentDate: string;
  paymentFrequency: 'MONTHLY' | 'WEEKLY';
  public: boolean;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  startDate: string;
  nextPayee?: string; // IGroupMembership.id
  groupContractAddress: string;
  token: 'USDC' | 'BTC' | 'SOL';
}

export interface IGroupMembership {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  groupId: string;
  amountOwed: number;
  groupPosition: number;
  role: 'MEMBER' | 'ADMIN';
  contributions: IContribution[];
}

export interface IUser {
  userId: string;
  walletAddress: string;
  memberships: IGroupMembership[];
}

export interface IContribution {
  id: string;
  createdAt: Date;
  amount: number;
  transactionHash: string;
  groupMemberId: string;
}
