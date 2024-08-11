import UserMenu from '../user-menu/user-menu';
import { getSession } from '@/actions/auth/auth';
import ThemeController from '../ui/theme-controller';

const Sidebar = async () => {
  const session = await getSession();

  return (
    <div className='sticky top-0 z-30 hidden h-dvh w-72 flex-col justify-between border-r p-2 md:flex'>
      <div>
        <UserMenu session={session} />
      </div>
      <div className='flex justify-end'>
        <ThemeController />
      </div>
    </div>
  );
};

export default Sidebar;
