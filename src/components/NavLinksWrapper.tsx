'use client';
import { useState } from 'react';
import NavLinks from './NavLinks';
import HamburgerButton from './HamburgerButton';


export default function NavigationElement() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = ( open: boolean ) => {
    // Toggle your menu visibility here
    setIsOpen(open);
  };
 
  return (
    <>
      <NavLinks className="hidden md:flex gap-4 items-center" />
      <HamburgerButton
        onToggle={handleToggle}
        className={`toggle_nav md:hidden isActive__${isOpen}`}
      />
      <NavLinks
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`mobileNav flex flex-col gap-4 md:hidden isOpen__${isOpen}`}
      />
    </>
  );
}
