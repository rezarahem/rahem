import { CartProvider } from '@/components/cart/cart-context';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <CartProvider>
      <div className='grid grid-rows-[auto_1fr_auto]'>
        <Navbar />
        <main className='min-h-dvh'>{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomeLayout;
