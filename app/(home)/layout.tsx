import { getSession } from '@/actions/auth/auth';
import { GetCartData } from '@/actions/cart/get-cart-data';
import { CartProvider } from '@/components/cart/cart-context';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();
  const res = await GetCartData(session?.user.id as number);

  return (
    <CartProvider
      cartId={res.cartId}
      userId={session?.user.id}
      initialCourses={res.courses}
    >
      <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomeLayout;
