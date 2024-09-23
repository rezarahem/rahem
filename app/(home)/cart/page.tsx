import { AuthorizeUser } from '@/actions/auth/authorize-user';
import CartClient from '@/components/cart/cart-client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'سبد خرید',
};

const Cart = async () => {
  const authorize = await AuthorizeUser();

  if (!authorize || !authorize.success) redirect('/');

  return <CartClient />;
};

export default Cart;
