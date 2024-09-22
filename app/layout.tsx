import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    default: 'راحم مرجع آموزش ریکت و نکست',
    template: '%s | راحم مرجع آموزش ریکت و نکست',
  },
  description: 'آموزش پروژه محور ریکت و نکست',
  // other: {
  //   enamad: '419877',
  // },
};

const mainFont = localFont({
  src: [
    {
      path: '../fonts/IRANSansXV.woff2',
    },
    {
      path: '../fonts/IRANSansXV.woff',
    },
  ],
  variable: '--font-isxv',
  weight: '100 1100',
  display: 'block',
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html dir='rtl' lang='fa-Ir' suppressHydrationWarning>
      <body className={cn('font-sanX', mainFont.variable)}>
        <NextTopLoader showSpinner={false} />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
