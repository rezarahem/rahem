import { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'ورود / ثبت‌نام',
};

const LoginPage = () => {
  return (
    <div className='flex h-dvh justify-center max-md:mt-20 md:items-center'>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
