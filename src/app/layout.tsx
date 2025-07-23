import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from './components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kell C. Styles - Y2K Hair Studio',
  description: 'Book your next amazing Y2K-inspired hairstyle with us',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
