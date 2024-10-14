import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants"

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5  flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple" width={14} height={180} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div className=''key={nav}>{nav}</div>
          ))}
        </div>
        <img src={bagImg} alt="bag" height={18} width={18} />
        <img src={searchImg} alt="searcb" height={18} width={18} />
      </nav>
    </header>
  );
};

export default Navbar;
