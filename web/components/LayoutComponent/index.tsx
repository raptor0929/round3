import React, { ReactNode } from 'react';
import NavbarLayout from '../Global/NavbarLayout';
import MainSidebar from '../Global/MainSidebar';

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="body grid grid-cols-6 grid-rows-12 h-screen">
      <div className="col-start-2 col-span-6 row-span-1 bg-white">
        <NavbarLayout />
      </div>
      <div className="col-start-1 col-end-2 row-start-1 row-end-13 ">
        <MainSidebar />
      </div>
      <div className="col-start-2 col-span-6 row-span-11 bg-background">
        {children}
      </div>
    </div>
  );
};

export default LayoutComponent;
