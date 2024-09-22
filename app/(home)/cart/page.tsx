import CartClient from '@/components/cart/cart-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سبد خرید',
};

const Cart = () => {
  return <CartClient />;
};

export default Cart;
