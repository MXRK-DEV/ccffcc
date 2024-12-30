"use client";

import Link from "next/link";
import Dd from './Dd';

const Navbar = () => {
  return (
    <header  className=" bg-gray-800 ">
      <div className="container flex items-center justify-between bg-gray-800 translate-x-10 p-4">
        <Link href="/">
          <h1 className="text-4xl transform translate-x-2">CROSS FOLD CHAPEL</h1>
        </Link>
        <Dd />
      </div>
    </header>
  );
};

export default Navbar;
