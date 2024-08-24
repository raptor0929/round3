import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link
      className="btn btn-ghost normal-case text-xl mx-6 my-10 relative"
      href="/"
    >
      <span className="text-background text-4xl font-inter">Round</span>
      <span className="bg-background px-2 rounded-full text-blueBackground font-inter absolute right-11">
        3
      </span>
    </Link>
  );
};

export default Logo;
