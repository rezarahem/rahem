'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../cart/cart-context';
import { CircleX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  addCommaAndRetuenPersianStringNumber,
  toPersianNumberStr,
} from '@/lib/persian-string';

type PaymentVerificationClientProps = {
  authority: string;
  status: string;
  ordreVerification?: boolean;
  orderNumber?: number;
  orderFinalPrice?: number;
};

const PaymentVerificationClient = ({
  authority,
  status,
  orderFinalPrice,
  orderNumber,
  ordreVerification,
}: PaymentVerificationClientProps) => {
  const {} = useCart();
  const router = useRouter();

  if (status === 'NOK')
    return (
      <div className='mx-auto max-w-lg space-y-10 rounded-md border p-4'>
        <div className='flex items-center justify-center'>
          <CircleX className='size-24 text-rose-500' />
        </div>
        <div className='text-center'>
          <p className='text-2xl font-extrabold'>رفیق، پرداخت انجام نشد 🙃</p>
        </div>
        <div className='space-y-3 divide-y'>
          <div className='flex items-center justify-between'>
            <p>شناسه سفارش</p>
            <p>{toPersianNumberStr(String(orderNumber))}</p>
          </div>
          <div className='flex items-center justify-between pt-3'>
            <p>مبلغ</p>
            <p className='flex items-center gap-x-2'>
              <span>
                {addCommaAndRetuenPersianStringNumber(String(orderFinalPrice))}
              </span>
              <span className='text-xs'>تومانء</span>
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Link href='/'>
            <Button size='lg' className='text-lg'>
              بازگشت
            </Button>
          </Link>
        </div>
      </div>
    );

  return <div></div>;
};

export default PaymentVerificationClient;
