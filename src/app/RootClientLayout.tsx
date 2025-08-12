'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/styles/theme/ThemeRegistry';

interface RootClientLayoutProps {
  children: ReactNode;
}

export default function RootClientLayout({ children }: RootClientLayoutProps) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
}
