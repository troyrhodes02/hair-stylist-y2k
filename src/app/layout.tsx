import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import RootClientLayout from './RootClientLayout';

export const metadata: Metadata = {
  title: 'Kell C. Styles - Y2K Hair Studio',
  description: 'Book your next amazing Y2K-inspired hairstyle with us',
  themeColor: '#1A0F1F',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
