import React, { useState, useRef, useEffect } from "react";
import { appleImg } from "../utils";
import { navLists } from "../constants";
import HamburgerMenu from "./HamburgerMenu";
import Search from "./Search";
import SearchR from "./SearchR";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the dropdown is open
  const dropdownRef = useRef(null); // Reference for the dropdown menu container
  const menuItemsRef = useRef([]); // References for each menu item

  // GSAP animation effect for showing/hiding the dropdown menu with staggered elements
  useEffect(() => {
    if (isOpen) {
      // Prevent page scrolling
      document.body.style.overflow = "hidden"; 
      
      
        
        
      
      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: "100%", // Animate the height to fully expand the menu
        
        pointerEvents: "auto",
        
      });
      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: "100%", // Animate the height to fully expand the menu
        
        pointerEvents: "auto",
        
      });
      

      // Stagger opacity animation for each menu item
      
    } else {
      // Re-enable page scrolling
      document.body.style.overflow = "auto"; 

      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: "0%", // Collapse the menu
        
        pointerEvents: "none", // Disable interactions when menu is closed
      });
    }
  }, [isOpen]);

  return (
    <header className="sticky z-50 top-0 w-full py-5 sm:px-10 px-5 flex justify-between items-center bg-black">
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
        <div className="flex items-center gap-5 max-sm:justify-end max-sm:flex-1 cursor-pointer hover:text-white">
          <Search className="fill-gray hover:fill-white transition-all duration-100" />
          <SearchR height={19} width={19} className="fill-gray hover:fill-white transition-all duration-100" />
          
          {/* Make the HamburgerMenu component the button */}
          <button onClick={() => setIsOpen(!isOpen)} className="relative z-50">
            <HamburgerMenu />
          </button>
        </div>
      </nav>

      {/* Dropdown menu container */}
     
      <div
        ref={dropdownRef}
        className={`fixed top-0 left-0 w-full h-0 opacity-1 bg-black text-white overflow-hidden flex flex-col z-40`}
      >
        {/* Dropdown content */}
        
        <div className="absolute top-12">
        {navLists.map((nav) => (
            <div
              id="items"
              className="px-5 py-1 text-sm cursor-pointer  text-gray hover:text-white transition-all duration-100 font-semibold text-3xl"
              key={nav}
            >
              {nav}
            </div>
          ))}
        </div>
      </div>

      {/* Hide other page content when menu is open */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
      )}
    </header>
  );
};

export default Navbar;
