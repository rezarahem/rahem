'use client';

import { CheckUser } from '@/actions/auth/check-user';
import { CreateUser } from '@/actions/auth/create-user';
import { OtpVerification } from '@/actions/auth/otp-verification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { regexOnlyDigits, toEnglishNumberStr } from '@/lib/persian-string';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { OtpSchema, PhoneNumberSchema, UserNameSchema } from '@/zod/zod';

const LoginForm = () => {
  // comp states
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [inputError, setInputError] = useState('');
  const [activeTemp, setActiveTemp] = useState<
    'phoneNumber' | 'userName' | 'otpNumber'
  >('phoneNumber');

  // input states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [userOtpNumber, setUserOtpNumber] = useState('');

  useEffect(() => {
    if (userOtpNumber.length === 5) {
      onVerification();
    }
  }, [userOtpNumber]);

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

        const res = await CheckUser(validatedField.data);

        if (res.code) {
          switch (res.code) {
            case 845:
              toast.success('کد ورود ارسال شد');
              setActiveTemp('otpNumber');
              break;
            case 800:
              toast.success('برای ورود ثبت نام کنید');
              setActiveTemp('userName');
              break;
          }
        } else {
          toast.error(res.errorMessage || 'خطایی رخ داد، مجددا تلاش کنید');
        }
      });
    } catch (error) {
      toast.error('خطایی رخ داد، مجددا تلاش کنید');
    }
  };

  const onRegisteration = () => {
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

        const validatedUserName = UserNameSchema.safeParse(userName);

        if (!validatedUserName.success) {
          setInputError(validatedUserName.error.errors[0].message);
          return;
        }

        const res = await CreateUser(
          validatedPhoneNumber.data,
          validatedUserName.data,
        );

        if (res.success) {
          toast.success('کد ورود ارسال شد');
          setActiveTemp('otpNumber');
        } else {
          toast.error(res.errorMessage || 'خطایی رخ داد، مجددا تلاش کنید');
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

        const res = await OtpVerification(
          validatedPhoneNumber.data,
          validatedOtp.data,
        );

        if (res.success) {
          toast.success('ورود موفق');
          router.push('/');
        } else {
          toast.error(res?.errorMessage || 'اختلال در شبکه، مجددا تلاش کنید');
        }
      });
    } catch (error) {
      toast.error('خطایی رخ داد، مجددا تلاش کنید');
    }
  };

  const handleSubmit = () => {
    switch (activeTemp) {
      case 'phoneNumber':
        onSubmitPhoneNumber();
        break;
      case 'userName':
        onRegisteration();
        break;
      case 'otpNumber':
        onVerification();
        break;
    }
  };

  ////////////////////////////////////
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

      case 'userName':
        return (
          <Input
            value={userName}
            onChange={(e) => {
              setInputError('');
              setUserName(e.target.value);
            }}
            disabled={isPending}
            className='ss02 w-full placeholder:text-xs'
            placeholder='نام و نام‌خانوادگی'
          />
        );

      case 'otpNumber':
        return (
          <div>
            <InputOTP
              pattern={regexOnlyDigits}
              maxLength={5}
              value={userOtpNumber}
              onChange={(v) => {
                setUserOtpNumber(v);
              }}
              disabled={isPending}
            >
              <InputOTPGroup>
                <InputOTPSlot className='ss02' index={4} />
              </InputOTPGroup>
              {/* <InputOTPSeparator /> */}
              <InputOTPGroup>
                <InputOTPSlot className='ss02' index={3} />
              </InputOTPGroup>
              {/* <InputOTPSeparator /> */}
              <InputOTPGroup>
                <InputOTPSlot className='ss02' index={2} />
              </InputOTPGroup>
              {/* <InputOTPSeparator /> */}
              <InputOTPGroup>
                <InputOTPSlot className='ss02' index={1} />
              </InputOTPGroup>
              {/* <InputOTPSeparator /> */}
              <InputOTPGroup>
                <InputOTPSlot className='ss02' index={0} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          // <Input
          //   value={userOtpNumber}
          //   onChange={(e) => {
          //     setUserOtpNumber(e.target.value);
          //   }}
          //   disabled={isPending}
          //   className='ss02 w-full placeholder:text-xs'
          //   placeholder='کد یک بار مصرف'
          // />
        );
    }
  };
  const formLabel = () => {
    switch (activeTemp) {
      case 'phoneNumber':
        return 'برای ادامه وارد شوید';

      case 'otpNumber':
        return 'کد تایید را ثبت کنید';

      case 'userName':
        return 'ثبت نام';
    }
  };
  const buttonLabel = () => {
    switch (activeTemp) {
      case 'phoneNumber':
        return 'ورود';

      case 'otpNumber':
        return 'ثبت';

      case 'userName':
        return 'ثبت';
    }
  };

  return (
    <div className='w-full space-y-4 p-5'>
      <div className='relative mx-auto max-w-96'>
        <p className='mb-10 text-sm text-muted-foreground'>{formLabel()}</p>
        <span className='absolute right-[3px] top-10 text-xs text-red-500'>
          {inputError}
        </span>
        {loginInput()}
        <Button
          onClick={handleSubmit}
          size='lg'
          className='mr-auto mt-10 flex'
          disabled={isPending}
        >
          {buttonLabel()}
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
