import Link from 'next/link';
import { logo_font } from '../ui/fonts';
import NavLinks from '../ui/navLinks';

export default function SiteHeader() {
	return (
    <header className="site-header">
      <nav className="nav-container flex justify-between items-center">
        <Link href="/">
          <div className={`circleLogo ${logo_font.className}`}>
            BN<span>.</span>
          </div>
        </Link>

        <NavLinks />
      </nav>
    </header>
  );
}