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
