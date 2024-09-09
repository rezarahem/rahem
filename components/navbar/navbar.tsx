import { getSession } from '@/actions/auth/auth';
import NavbarClient from './navbar-client';

const Navbar = async () => {
  const session = await getSession();

  return (
    <>
      <div className='fixed top-0 z-20 h-12 w-full backdrop-blur-lg sm:h-16'></div>
      <nav className='sticky top-0 z-20 h-12 border-b sm:h-16'>
        <NavbarClient session={session} />
      </nav>
    </>
  );
};

export default Navbar;
