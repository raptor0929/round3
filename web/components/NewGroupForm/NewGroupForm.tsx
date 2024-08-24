import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from '@nextui-org/react';
import React from 'react';

const NewGroupForm = () => {
  const [selectedKeys, setSelectedKeys] = React.useState('1');

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  return (
    <div className="bg-white h-full p-10 flex gap-2 rounded-lg">
      <Input type="title" label="Name of the group" />
      <Textarea
        label="Description"
        placeholder="Enter your description"
        className="max-w-xs"
      />
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
        >
          <DropdownItem key="1">1</DropdownItem>
          <DropdownItem key="2">2</DropdownItem>
          <DropdownItem key="3">3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NewGroupForm;
