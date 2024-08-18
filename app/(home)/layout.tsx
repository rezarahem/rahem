import { decryptData, encryptData, getSession } from '@/actions/auth/auth';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { utcDate } from '@/lib/date';

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
