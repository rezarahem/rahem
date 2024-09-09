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
        <Footer />
      </div>
    </CartProvider>
  );
};

export default HomeLayout;
