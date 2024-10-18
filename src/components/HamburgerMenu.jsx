import React from "react";
import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="cursor-pointer flex bottom-0 left-0 right-0 box-border h-[19px] w-[19px] translate-y-[2px] sm:hidden group"
      onClick={toggleMenu}
    >
      <div className="space-y-2 flex translate-y-1">
        <span
          className={`block absolute h-0.5 w-[19px] origin-center rounded-full  transition-transform ease-in-out duration-100 bg-gray group-hover:bg-[#a6a6a6]
              ${
                isOpen
                  ? "  translate-y-[0.2rem] rotate-45 w-[22px] -translate-x-0.5 !bg-white"
                  : ""
              }`}
        ></span>
        <span
          className={`block absolute h-0.5 w-[19px] origin-center rounded-full   transition-transform ease-in-out duration-100 bg-gray group-hover:bg-[#a6a6a6]
              ${
                isOpen
                  ? " -translate-y-[0.3rem] -rotate-45 w-[22px] -translate-x-0.5 !bg-white"
                  : ""
              }`}
        ></span>
      </div>
    </div>
  );
};

export default HamburgerMenu;
