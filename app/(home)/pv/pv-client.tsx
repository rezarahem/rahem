'use client';

import { RedirectTo } from '@/actions/payment/redirect-to';
import Container from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type PvClientProps = {
  Authority: string;
  Status: 'OK' | 'NOK';
};

const PvClient = ({ Authority, Status }: PvClientProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && Authority && Status) {
      RedirectTo(
        `/payment-verification?Authority=${Authority}&Status=${Status}`,
      );
    }
  }, [isMounted, Authority, Status, router]);

  // if (!isMounted) return <div>loading...</div>;

  return (
    <Container className='flex h-full items-center justify-center py-5'>
      <div className='mx-auto flex max-w-sm flex-1 flex-col items-center space-y-3'>
        <Skeleton className='size-24 rounded-full' />
        <Skeleton className='h-4 w-full rounded-full' />
        <Skeleton className='h-16 w-full rounded-md' />
        <Skeleton className='h-4 w-full rounded-full' />
        <Skeleton className='h-4 w-4/5 place-self-start rounded-full' />
        {/* <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div> */}
      </div>
    </Container>
  );
};

export default PvClient;
