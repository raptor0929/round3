import React, { ReactNode } from 'react';

const MainBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return <div className={`bg-success ${className}`}>{children}</div>;
};

export default MainBody;
