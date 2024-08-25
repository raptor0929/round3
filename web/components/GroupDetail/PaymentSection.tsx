import { useGroupDetail } from '@/hooks/useGroupDetail';
import { Button } from '@nextui-org/react';
import { useCallback } from 'react';

export const PaymentSection = () => {
  const { membership, makePayment } = useGroupDetail();

  const amountOwed = membership?.amountOwed ?? 0;

  const onPayPress = useCallback(async () => {
    await makePayment(amountOwed);
  }, [makePayment, amountOwed]);

  return (
    <div>
      <p>Balance due: {amountOwed !== undefined ? amountOwed : 'Loading...'}</p>
      <Button
        onPress={onPayPress}
        disabled={amountOwed <= 0}
        className="w-full bg-primaryOutline text-white"
      >
        Pay Balance
      </Button>
    </div>
  );
};
