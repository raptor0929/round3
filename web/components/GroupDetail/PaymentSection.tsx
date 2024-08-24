import { Button } from '@nextui-org/react';

export const PaymentSection = () => {
  return (
    <Button
      onPress={() => console.log('making payment!')}
      className="w-full bg-primaryOutline text-white"
    >
      Create Round
    </Button>
  );
};
