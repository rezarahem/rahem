import { notFound, redirect } from 'next/navigation';
import PvClient from './pv-client';

const Pv = ({
  searchParams,
}: {
  searchParams: {
    Authority?: string;
    Status?: 'OK' | 'NOK';
  };
}) => {
  const { Authority, Status } = searchParams;

  if (!Authority || !Status) notFound();

  return <PvClient Authority={Authority} Status={Status} />;
};

export default Pv;
