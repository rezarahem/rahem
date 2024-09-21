import { notFound, redirect } from 'next/navigation';
import { PaymentVerification } from '@/actions/payment/payment-verification';
import NokError from '@/components/payment-verification/nok-error';
// import { GetOrder } from '@/actions/order/get-order';
import SuccessfulOrder from '@/components/payment-verification/successful-order';
import { GetOrder } from '@/actions/order/get-order';

const PaymentVerificationPage = async ({
  searchParams,
}: {
  searchParams: {
    Authority?: string;
    Status?: 'OK' | 'NOK';
  };
}) => {
  const { Authority, Status } = searchParams;

  if (!Authority || !Status) notFound();

  if (Status === 'NOK') {
    const res = await GetOrder(Authority);

    if (!res || !res.success || !res.orderNumber || !res.orderFinalPrice)
      notFound();
    return (
      <NokError
        orderFinalPrice={res.orderFinalPrice}
        orderNumber={res.orderNumber}
      />
    );
  }

  if (Status === 'OK') {
    const verify = await PaymentVerification(Authority);

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
    }
  }
};

export default PaymentVerificationPage;
