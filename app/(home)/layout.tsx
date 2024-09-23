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
      <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
        <Navbar />
        <main>{children}</main>
        <div className='hidden 2xl:my-20 2xl:block'></div>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomeLayout;
