'use client';

import Link from 'next/link';
import Drawer from '../drawer/drawer';
import Container from '../ui/container';
import NavLinks from './nav-links';
import { Logout } from '@/actions/auth/logout';
import { LogIn, LogOut, ShoppingCart, User } from 'lucide-react';
import { Button } from '../ui/button';
import { UserSessionType } from '@/actions/auth/auth';
import UserAvatar from '../user/user-avatar';
import NavCart from '../cart/nav-cart';

type NavbarClientProps = {
  session: {
    user: UserSessionType;
    expires: Date;
  } | null;
};

const NavbarClient = ({ session }: NavbarClientProps) => {
  return (
    <Container
      defualtPY
      isFullHeight
      className='flex items-center justify-between gap-4'
    >
      <div className='flex items-center gap-2 md:gap-5'>
        <Drawer session={session} />
        <div className='max-sm:hidden'>
          <NavLinks />
        </div>
      </div>

      {session ? (
        <div className='flex gap-2'>
          <UserAvatar session={session} />
          <NavCart />
      
        </div>
      ) : (
        <Link
          href='/login'
          className='group flex h-9 items-center gap-2 rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black'
        >
          <LogIn className='size-5' />
          <span className='-translate-y-px'>ورود</span>
        </Link>
      )}
    </Container>
  );
};

export default NavbarClient;
