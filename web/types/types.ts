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
  nextPayee?: IGroupMembership;
  groupContractAddress: string;
  token: 'USDT' | 'BTC' | 'SOL';
}

export interface IGroupMembership {
  id: string;
  groupId: string;
  userId: string;
  role: 'ADMIN' | 'MEMBER';
  position: number;
}

export interface IUser {
  userId: string;
  walletAddress: string;
  memberships: IGroupMembership[];
}
