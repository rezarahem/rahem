'use client';

import { PaymentVerification } from '@/actions/payment/payment-verification';
import SuccessfulOrder from '@/components/payment-verification/successful-order';
import { notFound, redirect } from 'next/navigation';
import { use, useEffect, useState } from 'react';

type PaymentVerificationClientProps = {
  authority: string;
  status: 'OK' | 'NOK';
};

const PaymentVerificationClient = ({
  authority,
  status,
}: PaymentVerificationClientProps) => {
  if (status === 'OK') {
    const verify = use(PaymentVerification(authority));

    if (!verify || !verify.success) notFound();

    if (verify.code101) redirect('/');

    if (
      !verify.orderNumber ||
      !verify.orderFinalPrice ||
      !verify.orderRefId ||
      typeof verify.ordreVerification === 'undefined'
    )
      notFound();

    if (verify.ordreVerification) {
      return (
        <SuccessfulOrder
          orderFinalPrice={verify.orderFinalPrice}
          orderNumber={verify.orderNumber}
          orderRefId={verify.orderRefId}
        />
      );
    } else {
    }
  }
};

export default PaymentVerificationClient;
