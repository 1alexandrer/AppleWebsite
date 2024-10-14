import React from "react";
import { appleImg, bagImg, hamburgerMenu, searchImg } from "../utils";
import { navLists } from "../constants";
import HamburgerMenu from "./HamburgerMenu";
import Search from "./Search";
import SearchR from "./SearchR";







const Navbar = () => {
  return (
    <header className="sticky z-50 top-0 w-full py-5 sm:px-10 px-5  flex justify-between items-center bg-black">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple" width={14} height={180} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all duration-100"
              key={nav}
            >
              {nav}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-5 max-sm:justify-end max-sm:flex-1 cursor-pointer  hover:text-white ">
          
          <Search  className="fill-gray hover:fill-white transition-all duration-100" />
          <SearchR height={19} width={19} className="fill-gray hover:fill-white transition-all duration-100" />
          <HamburgerMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
