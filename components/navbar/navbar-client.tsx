'use client';

import Link from 'next/link';
import Drawer from '../drawer/drawer';
import Container from '../ui/container';
import Logo from '../ui/logo';

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
        <Link href='/about-us'>درباره ما</Link>
      </div>
      <Drawer session={session} />
      <Logo linkClassName='h-16 w-32' />
    </Container>
  );
};

export default NavbarClient;
