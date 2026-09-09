import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import '../ui/globals.css';
import { archivo } from '../ui/fonts';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://byniko.com'),
  title: {
    default: 'byNiko — websites and brands for galleries, nonprofits and small businesses',
    template: '%s · byNiko',
  },
  description:
    'I build websites, brands and custom applications for galleries, nonprofits and small businesses. Independent practice, since 2010.',
  openGraph: {
    type: 'website',
    url: 'https://byniko.com',
    title: 'byNiko',
    description:
      'Websites, brands and custom applications for galleries, nonprofits and small businesses. Independent practice, since 2010.',
    images: [
      {
        url: 'https://byniko.com/circle-logo.png',
        width: 1200,
        height: 1200,
        alt: 'byNiko',
      },
    ],
    siteName: 'byNiko',
  },
  icons: { icon: '/circle-logo.png' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
