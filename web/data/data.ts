import { IRoundGroup } from '@/types/types';

export const roundGroupsData: IRoundGroup[] = [
  {
    groupId: 'rg001',
    name: 'Crypto Savers',
    amount: 5000,
    numberOfMembers: 6, // Adjusted to be between 3 and 7
    frequency: 'Monthly',
    coin: 'USDT',
    startDate: '2024-09-01',
    type: 'PRIVATE',
    members: [
      { walletMemberId: 'wm001', position: 1 },
      { walletMemberId: 'wm002', position: 2 },
      { walletMemberId: 'wm003', position: 3 },
      { walletMemberId: 'wm004', position: 4 },
      { walletMemberId: 'wm005', position: 5 },
      { walletMemberId: 'wm006', position: 6 },
    ],
    status: 'RUNNING',
    description:
      'A private group focused on saving in USDT with a monthly frequency.',
  },
  {
    groupId: 'rg002',
    name: 'Bitcoin Builders',
    amount: 15000,
    numberOfMembers: 5, // Within the range of 3 to 7
    frequency: 'Weekly',
    coin: 'BTC',
    startDate: '2024-08-15',
    type: 'PUBLIC',
    members: [
      { walletMemberId: 'wm007', position: 1 },
      { walletMemberId: 'wm008', position: 2 },
      { walletMemberId: 'wm009', position: 3 },
      { walletMemberId: 'wm010', position: 4 },
      { walletMemberId: 'wm011', position: 5 },
    ],
    status: 'WAITING',
    description:
      'A public group dedicated to Bitcoin investments with a weekly contribution schedule.',
  },
  {
    groupId: 'rg003',
    name: 'Solana Stakers',
    amount: 8000,
    numberOfMembers: 4, // Adjusted to be between 3 and 7
    frequency: 'Biweekly',
    coin: 'SOL',
    startDate: '2024-07-20',
    type: 'PRIVATE',
    members: [
      { walletMemberId: 'wm012', position: 1 },
      { walletMemberId: 'wm013', position: 2 },
      { walletMemberId: 'wm014', position: 3 },
      { walletMemberId: 'wm015', position: 4 },
    ],
    status: 'ENDING',
    description:
      'A private group focused on staking Solana with biweekly contributions.',
  },
  {
    groupId: 'rg004',
    name: 'USDT Growth',
    amount: 20000,
    numberOfMembers: 7, // Adjusted to be between 3 and 7
    frequency: 'Monthly',
    coin: 'USDT',
    startDate: '2024-06-01',
    type: 'PUBLIC',
    members: [
      { walletMemberId: 'wm016', position: 1 },
      { walletMemberId: 'wm017', position: 2 },
      { walletMemberId: 'wm018', position: 3 },
      { walletMemberId: 'wm019', position: 4 },
      { walletMemberId: 'wm020', position: 5 },
      { walletMemberId: 'wm021', position: 6 },
      { walletMemberId: 'wm022', position: 7 },
    ],
    status: 'RUNNING',
    description:
      'A public group aimed at growing USDT holdings with monthly contributions.',
  },
  {
    groupId: 'rg005',
    name: 'BTC Holdings',
    amount: 10000,
    numberOfMembers: 3, // Adjusted to be between 3 and 7
    frequency: 'Quarterly',
    coin: 'BTC',
    startDate: '2024-08-01',
    type: 'PRIVATE',
    members: [
      { walletMemberId: 'wm023', position: 1 },
      { walletMemberId: 'wm024', position: 2 },
      { walletMemberId: 'wm025', position: 3 },
    ],
    status: 'WAITING',
    description:
      'A private group focused on BTC holdings with quarterly contributions.',
  },
];
