import { CalendarDate, parseDate } from '@internationalized/date';
import {
  Avatar,
  AvatarGroup,
  Button,
  DateInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  SharedSelection,
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import React, { useCallback, useState } from 'react';
import ModalGroup from './ModalGroup';
import { WalletButton } from '../solana/solana-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN } from '@coral-xyz/anchor';
import { Round3, Round3IDL } from '@round3/anchor';
import { TOKEN_PROGRAM_ID, createAccount, createAssociatedTokenAccount } from '@solana/spl-token';

const NewGroupForm = () => {
  const [nameOfGroup, setNameOfGroup] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState('5');
  const [foundingAmount, setFoundingAmount] = useState('100');
  const [paymentFrequency, setPaymentFrequency] = useState<
    'WEEKLY' | 'MONTHLY'
  >('MONTHLY');

  const [isPublic, setIsPublic] = useState(true);
  const [startDate, setStartDate] = useState(parseDate('2024-04-04'));
  const [token, setToken] = useState('USDC');

  const { connected: walletConnected } = useWallet();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const wallet = useAnchorWallet();

  const array = Array(12).fill(null);

  const initializeRound = async () => {
    if (!wallet) {
      alert('Please connect your wallet');
      return;
    }

    const connection = new Connection('https://api.devnet.solana.com');
    const provider = new AnchorProvider(connection, wallet, {});
    const programId = new PublicKey('5BFX4Zoj2NwRB6MheKbo9TpvTpQvocEJkPbWk8PQFwpc');
    const program = new Program(Round3IDL, programId, provider);

    const roundKeypair = Keypair.generate();
    const tokenMint = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
    const initializerTokenAccount = new PublicKey('Hbb9BJBboJSJJQKqTwa86AB4EQu4sS948Y453rgAMk4h');
    const roundTokenAccount = new PublicKey('4PuburbozaFjxiXQsGjGqvG2mAsx5fPQGbPZJvdDoiXY');

    try {
      await program.methods
        .initializeRound(
          new BN(parseFloat(foundingAmount) * 1e6), // Convert to lamports
          parseInt(numberOfMembers),
          new BN(parseInt(paymentFrequency))
        )
        .accounts({
          round: roundKeypair.publicKey,
          initializer: wallet.publicKey,
          tokenMint: tokenMint,
          initializerTokenAccount: initializerTokenAccount,
          roundTokenAccount: roundTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([roundKeypair])
        .rpc().catch(e => console.log(e));
        console.log('Success!!! ', roundTokenAccount);

    //   alert('Round initialized successfully!');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initialize round');
    }
  };

  const onCreateRoundPress = useCallback(async () => {
    if (!nameOfGroup || !foundingAmount) {
      return;
    }
    await initializeRound();
    onOpen();
  }, [onOpen, foundingAmount, nameOfGroup]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameOfGroup(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleNumberOfMembersChange = (keys: SharedSelection) => {
    const selectedKey = Array.from(keys).join('');
    setNumberOfMembers(selectedKey);
  };

  const handleFoundingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFoundingAmount(e.target.value);
  };

  const handlePaymentFrequencyChange = (keys: SharedSelection) => {
    const selectedKey = Array.from(keys).join('');
    setPaymentFrequency(selectedKey as 'WEEKLY' | 'MONTHLY');
  };

  const handleTypeOfGroupChange = (isPublic: boolean) => {
    setIsPublic(isPublic);
  };

  const handleStartDateChange = (date: CalendarDate) => {
    setStartDate(date);
  };

  const handleTokenChange = (keys: SharedSelection) => {
    const selectedKey = Array.from(keys).join('');
    setToken(selectedKey);
  };

  const handleSubmitInformation = () => {
    // Handle form submission logic here
  };

  return (
    <div className="flex w-full p-2 h-full gap-4">
      <div className="h-full w-1/2 ">
        <div className="h-full px-14 py-8">
          <h2 className="text-7xl h-1/5 font-bold font-sans flex items-center">
            New Round
          </h2>
          <div className="flex gap-2 items-center flex-wrap justify-center h-4/5">
            {[...Array(Number(numberOfMembers) || 0)].map((_, index) => (
              <Avatar
                key={index}
                src={`https://i.pravatar.cc/150?u=a04258114e29026708c${
                  index + 3
                }`}
                className="w-17 h-17 m-2 bg-white border-solid border-3 border-background"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white h-full w-1/2 p-12 rounded-lg grid grid-cols-2">
        {/* <span className="text-black text-xl font-sans">Name of the group:</span> */}
        <Input
          type="text"
          label="Name of the group"
          className="grid-cols-2 col-span-2 "
          value={nameOfGroup}
          onChange={handleNameChange}
        />

        {/* <span className="text-black text-xl font-sans">Funding Amount:</span> */}
        <Input
          type="number"
          label="Founding amount"
          className="grid-cols-2 col-span-2 "
          value={foundingAmount}
          onChange={handleFoundingAmountChange}
        />

        <span className="text-black text-xl font-sans">Number of Members:</span>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {numberOfMembers || 'Select'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={numberOfMembers}
            onSelectionChange={handleNumberOfMembersChange}
          >
            {[...Array(7)].map((_, index) => {
              return (
                <DropdownItem key={index + 2 + ''}>{index + 2}</DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <span className="text-black text-xl font-sans">Payment Frequency:</span>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {paymentFrequency || 'Select'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={paymentFrequency}
            onSelectionChange={handlePaymentFrequencyChange}
          >
            <DropdownItem key="MONTHLY">Monthly</DropdownItem>
            <DropdownItem key="WEEKLY">Weekly</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div className="h-full  gap-2 rounded-lg grid grid-cols-2 col-span-2">
          <div className="flex gap-2 items-center">
            <span className="text-black text-xl font-sans"> Visibility:</span>
            <Switch
              defaultSelected={isPublic}
              onChange={(e) => handleTypeOfGroupChange(e.target.checked)}
            />
            <span className="text-black text-lg font-sans">
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <span className="text-black text-xl font-sans">Token:</span>
            <Dropdown className="w-full">
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {token || 'Select'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={token}
                onSelectionChange={handleTokenChange}
              >
                <DropdownItem key="USDC">USDC</DropdownItem>
                <DropdownItem key="BTC">BTC</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* <span className="text-black">Description</span> */}
        <Textarea
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          className="grid-cols-2 col-span-2 items-center justify-center"
        />
        <div className="col-span-2 flex items-center">
          {walletConnected ? (
            <Button
              onPress={onCreateRoundPress}
              className="w-full bg-primaryOutline text-white py-6"
            >
              Create Round
            </Button>
          ) : (
            <WalletButton className="w-full bg-primaryOutline text-white py-6">
              Connect Wallet
            </WalletButton>
          )}
        </div>
        <ModalGroup
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          groupName={nameOfGroup}
          description={description}
          numberOfMembers={numberOfMembers}
          fundingAmount={foundingAmount}
          paymentFrequency={paymentFrequency}
          isPublic={isPublic}
          startDate={startDate.toString()} // Convert CalendarDate to string
          token={token}
        />
      </div>
    </div>
  );
};

export default NewGroupForm;
