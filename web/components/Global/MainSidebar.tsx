'use client';
import React from 'react';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { FaUsers, FaPlus, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const MainSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'New Round', icon: <FaPlus />, path: '/new-group' },
    { name: 'Your Rounds', icon: <FaUsers />, path: '/your-groups' },
    { name: 'Find Rounds', icon: <FaSearch />, path: '/find-groups' },
  ];

  return (
    <div className="bg-blueBackground h-full flex flex-col">
      <Logo />
      <div className="flex flex-col gap-2 h-full text-white">
        <ul className="font-sans">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              className={`flex items-center my-4 mx-6 p-3 rounded-lg cursor-pointer ${
                pathname === item.path ? 'bg-primaryOutline' : ''
              }`}
              href={item.path}
            >
              <span className="mr-2">{item.icon}</span>
              <span
                className={`text-2xl  ${
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
