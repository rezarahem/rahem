import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rahem',
  description: 'rahem.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir='rtl' lang='fa-Ir'>
      <body>{children}</body>
    </html>
  );
}
