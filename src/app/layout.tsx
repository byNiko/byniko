
import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import './globals.css';
import NavLinks from './ui/navLinks';
import Link from 'next/link';
import { logo_font } from './ui/fonts';


export const metadata: Metadata = {
  title: {
    default: 'ByNiko',
    template: '%s | ByNiko',
  },

  description: 'website & brand development for the arts',
  openGraph: {
    type: 'website',
    url: 'https://byniko.com',
    title: 'ByNiko',
    description: 'website & brand development for the arts',
    images: [
      {
        url: 'https://byniko.com/circle-logo.png',
        width: 1200,
        height: 1200,
        alt: 'ByNiko',
      },
    ],
    siteName: 'ByNiko',
  },
  icons: {
    icon: '/circle-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="static-container">
          <div className="static-container--inner py-4 px-8 relative">
            <div className="nav-container flex justify-between items-center">
              <Link href="/">
                <div className={`circleLogo ${logo_font.className}`}>
                  BN<span>.</span>
                </div>
              </Link>

              <NavLinks />
            </div>
            <div className="page-content">
              <div
                className="scrollbar-custom"
                style={{ maxHeight: '95%', overflowY: 'auto' }}
              >
                {children}
              </div>
              <Analytics />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
