'use client';

import navLinksData from '@/utils/navLinks-data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { subfont } from '../ui/fonts';
import clsx from 'clsx';
// UPLOAD

type NavLinksProps = {
  className?: string;
  onClick?: () => void;
};

export default function NavLinks({ className, onClick }: NavLinksProps) {
  const pathname = usePathname();
  return(
  <ul className={className}>
    {navLinksData.map((link) => {
      return (
        <Link
          key={link.name}
          href={link.href}
          onClick = {onClick}
          className={clsx(` ${subfont.className} hover:border-b-2 `, {
            'border-b ': pathname === link.href,
          })}
        >
          <span>{link.name}</span>
        </Link>
      );
    })}
    </ul>
  );
}
