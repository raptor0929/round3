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
  const [numberOfMembers, setNumberOfMembers] = useState('2');
  const [foundingAmount, setFoundingAmount] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');
  const [typeOfGroup, setTypeOfGroup] = useState('Private');
  const [startDate, setStartDate] = useState(parseDate('2024-04-04'));
  const [token, setToken] = useState('');
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
    setTypeOfGroup(isPublic ? 'Public' : 'Private');
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
    <div className="flex w-full p-10 h-full gap-4">
      <div className="flex flex-col gap-10 w-1/2 p-20 bg-white rounded-lg">
        <span className="text-5xl h-1/4">Create New Round</span>
        <div className="flex gap-2 items-center flex-wrap justify-center h-2/4">
          {[...Array(Number(numberOfMembers) || 0)].map((_, index) => (
            <Avatar
              key={index}
              src={`https://i.pravatar.cc/150?u=a04258114e29026708c${index}`}
              className="w-20 h-20 m-2"
            />
          ))}
        </div>
        <DateDisplay date={startDate.toString()} />
      </div>
      <div className="bg-white h-full w-1/2 p-20 gap-2 rounded-lg grid grid-cols-2">
        <span className="text-black">Name of the group:</span>
        <Input
          type="text"
          label="Name of the group"
          value={nameOfGroup}
          onChange={handleNameChange}
        />
        <span className="text-black">Founding Amount</span>
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

        <span className="text-black">Payment Frequency</span>
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
            <DropdownItem key="Monthly">Monthly</DropdownItem>
            <DropdownItem key="Weekly">Weekly</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div className="h-full  gap-2 rounded-lg grid grid-cols-2 col-span-2">
          <div className="flex gap-2 items-center">
            <span className="text-black">Public or Private</span>
            <Switch
              defaultSelected={typeOfGroup === 'Public'}
              onChange={(e) => handleTypeOfGroupChange(e.target.checked)}
            />
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
                <DropdownItem key="USDT">USDT</DropdownItem>
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
        <div className="col-span-1 "></div>
        <div className="col-span-1  flex items-center">
          <Button color="primary" onPress={onOpen} className="w-full">
            Create Group
          </Button>
        </div>
        <ModalGroup
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          groupName={nameOfGroup}
          description={description}
          numberOfMembers={numberOfMembers}
          foundingAmount={foundingAmount}
          paymentFrequency={paymentFrequency}
          typeOfGroup={typeOfGroup}
          startDate={startDate.toString()} // Convert CalendarDate to string
          token={token}
        />
      </div>
    </div>
  );
};

export default NewGroupForm;
