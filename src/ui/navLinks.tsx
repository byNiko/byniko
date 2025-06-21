'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { 
	name: 'Home', 
	href: '/'
	},
  {
    name: 'Services',
    href: '/services'
  },
  { 
	name: 'Work', 
	href: '/work'
	},
  { 
	name: 'About', 
	href: '/about'
	},
  { 
	name: 'Contact', 
	href: '/contact'
	},
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className = "flex gap-4 items-center">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx( ``, {
              'bg-sky-100 text-blue-600': pathname === link.href,
            })}
          >
            <span>{link.name}</span> 
          </Link>
        );
      })}
    </nav>
  );
}
