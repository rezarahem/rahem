import { getSession } from '@/actions/auth/auth';
import NavbarClient from './navbar-client';

const Navbar = async () => {
  const session = await getSession();

  return (
    <nav className='sticky top-0 z-30 h-16 border-b bg-white dark:bg-slate-950'>
      <NavbarClient session={session} />
    </nav>
  );
};

export default Navbar;
