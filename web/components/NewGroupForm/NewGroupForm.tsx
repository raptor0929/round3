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
  Image,
  Input,
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import React, { useState } from 'react';
import ModalGroup from './ModalGroup';
import DateDisplay from './DateDisplay';

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
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const array = Array(12).fill(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameOfGroup(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleNumberOfMembersChange = (keys: React.Key[]) => {
    const selectedKey = Array.from(keys).join('');
    setNumberOfMembers(selectedKey);
  };

  const handleFoundingAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFoundingAmount(e.target.value);
  };

  const handlePaymentFrequencyChange = (keys: React.Key[]) => {
    const selectedKey = Array.from(keys).join('');
    setPaymentFrequency(selectedKey);
  };

  const handleTypeOfGroupChange = (isPublic: boolean) => {
    setIsPublic(isPublic);
  };

  const handleStartDateChange = (date: CalendarDate) => {
    setStartDate(date);
  };

  const handleTokenChange = (keys: React.Key[]) => {
    const selectedKey = Array.from(keys).join('');
    setToken(selectedKey);
  };

  const handleSubmitInformation = () => {
    // Handle form submission logic here
  };

  return (
    <div className="flex w-full p-2 h-full gap-4">
      <div className="relative h-full w-1/2  ">
        <div
          className="absolute w-full h-full p-14  bg-no-repeat bg-cover rounded-lg"
          style={{
            backgroundImage: `url('./images/fondo01.jpg')`,
            filter: 'blur(4px)',
          }}
        ></div>
        <div className="relative flex flex-col p-24 w-full gap-10 justify-center h-full">
          <h2 className="text-7xl h-1/4 font-inter font-bold ">New Round</h2>
          <div className="flex gap-2 items-center flex-wrap justify-center h-2/4">
            {[...Array(Number(numberOfMembers) || 0)].map((_, index) => (
              <Avatar
                key={index}
                src={`https://i.pravatar.cc/150?u=a04258114e29026708c${index}`}
                className="w-20 h-20 m-2 bg-white border-solid border-3 border-background"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white h-full w-1/2 p-20 gap-2 rounded-lg grid grid-cols-2">
        <span className="text-black">Name of the group:</span>
        <Input
          type="text"
          label="Name of the group"
          value={nameOfGroup}
          onChange={handleNameChange}
        />
        <span className="text-black">Funding Amount:</span>
        <Input
          type="number"
          label="Founding amount"
          value={foundingAmount}
          onChange={handleFoundingAmountChange}
        />

        <span className="text-black">Number of Members:</span>
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

        <span className="text-black">Payment Frequency:</span>
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
            <DropdownItem key="MONTHLY">MONTHLY</DropdownItem>
            <DropdownItem key="WEEKLY">WEEKLY</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div className="h-full  gap-2 rounded-lg grid grid-cols-2 col-span-2">
          <div className="flex gap-2 items-center">
            <span> Visibility:</span>
            <Switch
              defaultSelected={isPublic}
              onChange={(e) => handleTypeOfGroupChange(e.target.checked)}
            />
            <span className="text-black">
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <span className="text-black">Token</span>
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

        {/* <span className="text-black">Start date</span>
      <DateInput
        label="Start Date"
        isDisabled={false}
        value={startDate}
        onChange={handleStartDateChange}
        placeholderValue={new CalendarDate(1995, 11, 6)}
      /> */}

        <span className="text-black">Description</span>
        <Textarea
          label="Description"
          placeholder="Enter your description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="col-span-2  flex items-center">
          <Button
            onPress={onOpen}
            className="w-full bg-primaryOutline text-white"
          >
            Create Round
          </Button>
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
