import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link className="btn btn-ghost normal-case text-xl mx-6 my-10" href="/">
      <span className="text-branding text-4xl font-inter">Round</span>
      <span className="bg-branding px-2 rounded-full text-black font-inter">
        3
      </span>
    </Link>
  );
};

export default Logo;
