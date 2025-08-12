import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import RootClientLayout from './RootClientLayout';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Kell C. Styles - Y2K Hair Studio',
  description: 'Book your next amazing Y2K-inspired hairstyle with us',
  themeColor: '#1A0912',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' style={{ backgroundColor: '#1A0912' }}>
      <body style={{ backgroundColor: '#1A0912' }}>
        <script
          async
          src='https://sandbox.web.squarecdn.com/v1/square.js'
        ></script>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
