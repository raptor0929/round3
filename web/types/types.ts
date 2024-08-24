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
  coin: 'USDT' | 'BTC' | 'SOL';
  startDate: string;
  type: 'PRIVATE' | 'PUBLIC';
  members: IMembers[];
  status: 'RUNNING' | 'WAITING' | 'ENDING';
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
  token: 'USDT' | 'BTC' | 'SOL';
}

export interface IGroupMembership {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  groupId: string;
  role: 'MEMBER' | 'ADMIN';
  groupPosition: number;
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
