import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import {
  addCommaAndRetuenPersianStringNumber,
  toPersianNumberStr,
} from '@/lib/persian-string';
import { CircleX } from 'lucide-react';
import Link from 'next/link';

type NokErrorProps = {
  orderFinalPrice: number;
  orderNumber: number;
};

const NokError = ({ orderNumber, orderFinalPrice }: NokErrorProps) => {
  return (
    <Container className='py-5'>
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
            <Button>بازگشت</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default NokError;
