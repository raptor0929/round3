import React, { useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { IContribution, IGroupMembership } from '@/types/types'; // Assume this is your type for group members
import { useSession } from 'next-auth/react';
import { useContributions } from '@/hooks/useContributions';

// Utility function to truncate userId
const truncateId = (id: string) => {
  if (id.length <= 6) return id;
  return `${id.slice(0, 3)}..${id.slice(-3)}`;
};

export default function TablePayments({
  members,
  token,
  groupId,
}: {
  members: IGroupMembership[];
  token: string;
  groupId: string;
}) {
  const [loading, setLoading] = useState(false);

  const { groupContributions: contributions, makePayment } =
    useContributions(groupId);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const onPayPress = useCallback(async (amount: number) => {
    setLoading(true);
    try {
      await makePayment(amount);
    } catch (error) {
      console.error('Error in making payment:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const connectedUser = members.find((member) => member.userId === userId);
  if (!connectedUser) return null;

  console.log('contributions:', contributions, connectedUser);

  return (
    <div className="w-full mt-6">
      <h3 className="text-xl font-semibold mb-4">Payment Schedule</h3>
      <div className="grid grid-cols-3 gap-4 text-left">
        <div className="font-semibold">User ID</div>
        <div className="font-semibold">Amount Due</div>
      </div>
      {members.map((member) => (
        <div
          key={member.userId}
          className="grid grid-cols-3 gap-4 items-center py-2"
        >
          <div>
            {truncateId(member.userId)}{' '}
            {connectedUser.userId === member.userId && '(You)'}
          </div>
          <div>
            {member.amountOwed} {token}
          </div>
          <div>
            {connectedUser.userId === member.userId ? (
              <Button
                color="primary"
                isLoading={loading}
                isDisabled={connectedUser.amountOwed === 0}
                onPress={() => onPayPress(connectedUser.amountOwed)}
              >
                Pay
              </Button>
            ) : (
              <span className="text-default-400">-</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Example handler for pay button (to be implemented)
const handlePay = (userId: string) => {
  console.log(`Pay button clicked for userId: ${userId}`);
  // Implement your payment logic here
};
