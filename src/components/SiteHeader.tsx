'use client';
import Link from 'next/link';
import { logo_font } from '../ui/fonts';
import NavLinksWrapper from './NavLinksWrapper';

export default function SiteHeader() {

	return (
    <header className="site-header">
      <nav className="nav-container flex justify-between items-center">
        <Link href="/">
          <div className={`circleLogo ${logo_font.className}`}>
            BN<span>.</span>
          </div>
        </Link>
        <NavLinksWrapper />
      </nav>
    </header>
  );
}