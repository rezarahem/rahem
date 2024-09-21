import { decryptData } from '@/actions/auth/auth';
import { AuthorizeUser } from '@/actions/auth/authorize-user';
import { GetUserOrders } from '@/actions/user/get-user-orders';
import Container from '@/components/ui/container';
import LicenseKeySnippet from '@/components/user/license-key-snippet';
import { notFound } from 'next/navigation';

const UserPage = async () => {
  const authorize = await AuthorizeUser();

  if (!authorize || !authorize.success) notFound();

  const orders = await GetUserOrders();
  console.log(orders);

  return (
    <Container className='grid grid-cols-[auto_1fr] gap-5 py-5'>
      <div className='w-60 gap-2'>
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
