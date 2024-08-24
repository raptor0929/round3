'use client';
import React from 'react';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { FaUsers, FaPlus, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const MainSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'New Group', icon: <FaPlus />, path: '/new-group' },
    { name: 'Your Groups', icon: <FaUsers />, path: '/your-groups' },
    { name: 'Find Groups', icon: <FaSearch />, path: '/find-groups' },
  ];

  return (
    <div className="bg-blueBackground h-full flex flex-col">
      <Logo />
      <div className="flex flex-col gap-2 h-full text-white">
        <ul>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              className={`flex items-center my-2 mx-6 p-3 rounded-lg cursor-pointer ${
                pathname === item.path ? 'bg-primary' : ''
              }`}
              href={item.path}
            >
              <span className="mr-2">{item.icon}</span>
              <span
                className={`text-lg  ${
                  pathname === item.path ? 'font-bold' : ''
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainSidebar;
