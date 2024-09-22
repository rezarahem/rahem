'use client';

import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import {
  addCommaAndRetuenPersianStringNumber,
  toPersianNumberStr,
} from '@/lib/persian-string';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

type SuccessfulOrderProps = {
  orderFinalPrice: number;
  orderNumber: number;
  orderRefId: number;
};

const SuccessfulOrder = ({
  orderFinalPrice,
  orderNumber,
  orderRefId,
}: SuccessfulOrderProps) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  });

  return (
    <Container className='py-5'>
      <div className='mx-auto max-w-lg space-y-10 rounded-md border p-4'>
        <div className='flex items-center justify-center'>
          <CircleCheck className='size-24 text-green-400' />
        </div>
        <div className='text-center'>
          <p className='text-2xl font-extrabold'>
            پرداخت با موفقیت انجام شد 🥳
          </p>
        </div>
        <div className='space-y-3 divide-y'>
          <div className='flex items-center justify-between'>
            <p>شناسه سفارش</p>
            <p>{toPersianNumberStr(String(orderNumber))}</p>
          </div>
          <div className='flex items-center justify-between pt-3'>
            <p>شماره پیگیری</p>
            <p>{toPersianNumberStr(String(orderRefId))}</p>
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
          <Link
            href='/user'
            className='flex items-center justify-center gap-x-2'
          >
            <Button>برو به لایسنس‌های من</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SuccessfulOrder;
