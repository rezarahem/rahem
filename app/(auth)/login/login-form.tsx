'use client';

import { CheckOrCreateUser } from '@/actions/auth/check-or-create-user';
import { OtpVerification } from '@/actions/auth/otp-verification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toEnglishNumberStr } from '@/lib/persian-string';
import { OtpSchema, PhoneNumberSchema } from '@/zod/login-schema';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [inputError, setInputError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userOtpNumber, setUserOtpNumber] = useState('');
  const [activeTemp, setActiveTemp] = useState<'phoneNumber' | 'otpNumber'>(
    'phoneNumber',
  );

  const onSubmitPhoneNumber = () => {
    try {
      startTransition(async () => {
        const validatedField = PhoneNumberSchema.safeParse(
          toEnglishNumberStr(phoneNumber),
        );

        if (!validatedField.success) {
          setInputError(validatedField.error.errors[0].message);
          return;
        }

        const result = await CheckOrCreateUser(validatedField.data);

        if (!result) {
          toast.error('اختلال در شبکه، مجددا تلاش کنید');
        } else if (!result.success && result.errorMessage) {
          toast.error(result.errorMessage);
        } else if (result.success) {
          setActiveTemp('otpNumber');
          toast.success('کد ورود ارسال شد');
        } else {
          toast.error('خطایی رخ داد، مجددا تلاش کنید');
        }
      });
    } catch (error) {
      // console.log(error);
      toast.error('خطایی رخ داد، مجددا تلاش کنید');
    }
  };

  const onVerification = () => {
    try {
      startTransition(async () => {
        const validatedPhoneNumber = PhoneNumberSchema.safeParse(
          toEnglishNumberStr(phoneNumber),
        );

        if (!validatedPhoneNumber.success) {
          toast.error('خطایی رخ داد، مجددا تلاش کنید');
          setActiveTemp('phoneNumber');
          return;
        }

        const validatedOtp = OtpSchema.safeParse(
          toEnglishNumberStr(userOtpNumber),
        );

        if (!validatedOtp.success) {
          setInputError(validatedOtp.error.errors[0].message);
          return;
        }

        const result = await OtpVerification(
          validatedPhoneNumber.data,
          validatedOtp.data,
        );

        if (!result) {
          toast.error('اختلال در شبکه، مجددا تلاش کنید');
        } else if (!result.success && result.errorMessage) {
          toast.error(result.errorMessage);
        } else if (result.success) {
          toast.success('ورود موفق');
          redirect('/');
        } else {
          toast.error('خطایی رخ داد، مجددا تلاش کنید');
        }
      });
    } catch (error) {
      toast.error('خطایی رخ داد، مجددا تلاش کنید');
    }
  };

  const loginInput = () => {
    switch (activeTemp) {
      case 'phoneNumber':
        return (
          <Input
            value={phoneNumber}
            onChange={(e) => {
              setInputError('');
              setPhoneNumber(e.target.value);
            }}
            disabled={isPending}
            className='ss02 w-full placeholder:text-xs'
            placeholder='شماره تماس'
          />
        );

      case 'otpNumber':
        return (
          <Input
            value={userOtpNumber}
            onChange={(e) => {
              setUserOtpNumber(e.target.value);
            }}
            disabled={isPending}
            className='ss02 w-full placeholder:text-xs'
            placeholder='کد یک بار مصرف'
          />
        );
    }
  };

  return (
    <div className='w-full space-y-4 p-5'>
      <div className='relative mx-auto max-w-96'>
        <p className='mb-10 text-sm text-muted-foreground'>
          برای ادامه وارد شوید
        </p>
        <span className='absolute right-[3px] top-10 text-xs text-red-500'>
          {inputError}
        </span>
        {loginInput()}
        <Button
          onClick={(e) => {
            e.preventDefault();

            activeTemp === 'phoneNumber'
              ? onSubmitPhoneNumber()
              : onVerification();
          }}
          size='lg'
          className='mr-auto mt-10 flex'
          disabled={isPending}
        >
          ورود
          <div className='-translate-x-3'>
            {isPending ? (
              <LoaderCircle className='size-4 animate-spin' />
            ) : (
              <ArrowLeft className='size-4' />
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
