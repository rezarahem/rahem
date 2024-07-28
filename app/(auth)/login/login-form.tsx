'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneNumberSchema } from '@/zod/phone-number';
import { ArrowLeft } from 'lucide-react';

import { use, useState } from 'react';

const LoginForm = () => {
  const [toast, setToast] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpNumber, setOtpNumber] = useState('');
  const [activeTemp, setActiveTemp] = useState<'phoneNumber' | 'otpNumber'>(
    'phoneNumber',
  );

  const onSubmitPhoneNumber = () => {
    const validatedField = PhoneNumberSchema.safeParse(phoneNumber);

    if (!validatedField.success) {
      setToast(validatedField.error.errors[0].message);
    }

    if (validatedField.success) {
      // call sms api
    }
  };

  const loginInput = () => {
    switch (activeTemp) {
      case 'phoneNumber':
        return (
          <Input
            value={phoneNumber}
            onChange={(e) => {
              setToast('');
              setPhoneNumber(e.target.value);
            }}
            className='ss02 w-full placeholder:text-xs'
            placeholder='شماره تماس'
          />
        );
        break;

      case 'otpNumber':
        return (
          <Input
            value={otpNumber}
            onChange={(e) => {
              setOtpNumber(e.target.value);
            }}
            className='ss02 w-full placeholder:text-xs'
            placeholder='کد یک بار مصرف'
          />
        );
        break;
    }
  };

  return (
    <div className='w-full space-y-4 p-5'>
      <div className='relative mx-auto max-w-96'>
        <p className='mb-10 text-sm text-muted-foreground'>
          برای ادامه وارد شوید
        </p>
        <span className='absolute right-[3px] top-10 text-xs text-destructive'>
          {toast}
        </span>
        {loginInput()}
        <Button
          onClick={onSubmitPhoneNumber}
          size='lg'
          className='mr-auto mt-10 flex'
        >
          ورود
          <ArrowLeft className='size-4 -translate-x-3' />
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
