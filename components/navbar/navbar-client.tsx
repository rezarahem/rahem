'use client';

import Link from 'next/link';
import Drawer from '../drawer/drawer';
import Container from '../ui/container';

type NavbarClientProps = {
  session: {
    user: {
      id: number;
      userRole?: string;
      phoneNumber: string;
    };
    expires: string;
  } | null;
};

const NavbarClient = ({ session }: NavbarClientProps) => {
  return (
    <Container
      defualtPY
      isFullHeight
      className='flex items-center justify-between gap-4'
    >
      <div className='flex gap-4 max-md:hidden'>
        <Link href='#'>دوره‌ها</Link>
        <Link href='/about-us'>درباره ما</Link>
      </div>
      <Drawer session={session} />
      <div>rahem.dev</div>
    </Container>
  );
};

export default NavbarClient;
