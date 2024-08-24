import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link className="btn btn-ghost normal-case text-xl mx-6 my-10 " href="/">
      <span className="text-white text-4xl font-inter">Round</span>
      <span className="bg-white px-2 rounded-full text-blueBackground font-inter  right-11">
        3
      </span>
    </Link>
  );
};

export default Logo;
