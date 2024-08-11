import { cn } from '@/lib/utils';
import Link from 'next/link';

// const dot16 = DotGothic16({
//   weight: '400',
//   subsets: ['latin'],
//   display: 'block',
// });

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href='/' className={cn('font-dot16 text-4xl', className)} dir='ltr'>
      rahem.dev
    </Link>
  );
};

export default Logo;
