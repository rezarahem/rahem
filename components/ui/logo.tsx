import { cn } from '@/lib/utils';
import Link from 'next/link';
import logo from '@/public/rahem.dev_png_logo.png';
import Image from 'next/image';

type LogoProps = {
  linkClassName?: string;
  imgClassName?: string;
};

const Logo = ({ linkClassName, imgClassName }: LogoProps) => {
  return (
    <Link href='/' className={cn('relative', linkClassName)} dir='ltr'>
      <Image
        src={logo}
        alt='rahem.dev'
        fill
        sizes='33vw'
        draggable={false}
        className={cn('object-contain invert dark:invert-0', imgClassName)}
      />
    </Link>
  );
};

export default Logo;
