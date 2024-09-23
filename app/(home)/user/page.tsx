import { AuthorizeUser } from '@/actions/auth/authorize-user';
import { GetUserOrders } from '@/actions/user/get-user-orders';
import Container from '@/components/ui/container';
import LicenseKeySnippet from '@/components/user/license-key-snippet';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'حساب کاربری',
};

const UserPage = async () => {
  const authorize = await AuthorizeUser();

  if (!authorize || !authorize.success) redirect('/');

  const orders = await GetUserOrders();

  return (
    <Container className='grid grid-cols-1 gap-5 py-5 md:grid-cols-[auto_1fr]'>
      <div className='w-max md:w-60'>
        <p className='rounded-md bg-slate-100 p-2 dark:bg-slate-100/15'>
          دوره‌های من
        </p>
      </div>
      <div>
        {orders.userOrders?.map(async (order) => (
          <LicenseKeySnippet
            key={order.licence}
            license={order.licence as string}
            coursesTitles={order.orderItem}
          />
        ))}
      </div>
    </Container>
  );
};

export default UserPage;
