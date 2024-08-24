'use client';
import { Switch } from '@nextui-org/react';
import React, { useState } from 'react';

const Test = () => {
  const [isSelected, setIsSelected] = useState(true);
  return (
    <div className="w-10 h-10 bg-warning">
      <div className="flex flex-col gap-2">
        <Switch isSelected={isSelected} onValueChange={setIsSelected}>
          Airplane mode
        </Switch>
        <p className="text-small text-default-500">
          Selected: {isSelected ? 'true' : 'false'}
        </p>
      </div>
    </div>
  );
};

export default Test;
