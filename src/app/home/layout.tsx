import { Metadata } from 'next';

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
  return <div className="page-content">{children}</div>;
}
