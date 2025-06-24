'use client';

import navLinksData from '@/utils/navLinks-data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { subfont } from '../ui/fonts';
import clsx from 'clsx';
import { useState } from 'react';
import NavLinks from './NavLinks';

export default function NavigationElement() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavLinks className="hidden md:flex gap-4 items-center" />
      <button className={`toggle_nav md:hidden isActive__${isOpen}`} onClick = {() => setIsOpen(!isOpen)}>
        Menu
      </button>
      <NavLinks onClick= {()=>{ setIsOpen(!isOpen);}} className={`mobileNav flex flex-col gap-4 md:hidden isOpen__${isOpen}`} />
    </>
  );
}
