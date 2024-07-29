'use client';

import { Otp } from '@/actions/otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toEnglishNumberStr } from '@/lib/persian-string';
import { OtpSchema, PhoneNumberSchema } from '@/zod/login-schema';
import { ArrowLeft } from 'lucide-react';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [inputError, setInputError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userOtpNumber, setUserOtpNumber] = useState('');
  const [otpNumber, setOtpNumber] = useState('');
  const [activeTemp, setActiveTemp] = useState<'phoneNumber' | 'otpNumber'>(
    'phoneNumber',
  );

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

        const result = await Otp(validatedField.data);

        if (!result) {
          toast.error('اختلال در شبکه، مجددا تلاش کنید');
        } else if (result.errorMessage) {
          toast.error(result.errorMessage);
        } else if (result.code) {
          setOtpNumber(result.code);
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
        const validatedField = OtpSchema.safeParse(
          toEnglishNumberStr(userOtpNumber),
        );

        if (!validatedField.success) {
          setInputError(validatedField.error.errors[0].message);
          return;
        }

        const isVerified = otpNumber === userOtpNumber;

        if (!isVerified) {
          toast.error('کد ورود صحیح نمی‌باشد');
          return;
        } else {
          toast.success('ورود موفق');
        }
      });
    } catch (error) {
      toast.error('خطایی رخ داد، مجددا تلاش کنید');
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
          <ArrowLeft className='size-4 -translate-x-3' />
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
