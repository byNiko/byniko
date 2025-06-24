'use client';
import Link from 'next/link';
import NavLinksWrapper from './NavLinksWrapper';
import CircleLogo from './CircleLogo';

export default function SiteHeader() {

	return (
    <header className="site-header">
      <nav className="nav-container flex justify-between items-center">
        <Link href="/">
         <CircleLogo />
        </Link>
        <NavLinksWrapper />
      </nav>
    </header>
  );
}