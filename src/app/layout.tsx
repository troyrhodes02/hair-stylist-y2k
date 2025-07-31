import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import RootClientLayout from './RootClientLayout';
import { Playfair_Display } from 'next/font/google';

// TODO: Move to a more appropriate location for global font loading
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

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
      <body className={playfair.variable}>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
