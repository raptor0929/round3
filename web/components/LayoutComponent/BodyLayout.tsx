import React, { ReactNode } from 'react';

const BodyLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="h-full px-14 py-8">
      <div className="text-blueBackground text-5xl h-24 flex items-center mb-2">
        {title}
      </div>
      <div
        className="bg-white w-full rounded-lg h-fit p-6"
        style={{ height: 'calc(100% - 6.5rem)' }}
      >
        {children}
      </div>
    </div>
  );
};

export default BodyLayout;
