import { Metadata } from 'next';
import { body_font } from '../../ui/fonts';
import '../../ui/globals.css';
import SiteFooter from '../../components/SiteFooter';

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
    <>
      <div className="container mx-auto max-w-2xl lg:max-w-6xl">
        <div className={`flex flex-col ${body_font.className} text-xl`}>
          {children}
          <SiteFooter />
        
        </div>
      </div>
    </>
  );
}
