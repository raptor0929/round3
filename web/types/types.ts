export interface IMembers {
  walletMemberId: string;
  position: number;
}
export interface IRoundGroup {
  roundGroupId: string;
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

export interface IGroupMembership {
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
