import './globals.css';
import NavLinks from './ui/navLinks';
import Link from 'next/link';
import { logo_font } from './ui/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="static-container">
          <div
            className="static-container--inner py-4 px-8 relative"
          >
            <div className="nav-container flex justify-between items-center">
              <Link href="/">
                <div className={`circleLogo ${logo_font.className}`}>
                  BN<span>.</span>
                </div>
              </Link>

              <NavLinks />
            </div>
            <div className="page-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
