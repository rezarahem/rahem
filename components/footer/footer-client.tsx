'use client';

import telegramLogo from '@/public/telegram.png';
import youtubeLogo from '@/public/youtube.png';
import instagramLogo from '@/public/instagram.png';
import githubLogo from '@/public/github.png';
import enamadLogo from '@/public/enamad.png';
import Container from '../ui/container';
import ThemeController from '../ui/theme-controller';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Logo from '../logo/logo';

const socialIcons = [
  {
    label: 'instagram',
    logo: instagramLogo,
    size: 'size-8',
    href: 'https://www.instagram.com/rahem.dev?igsh=MXBqcW5nYnBhemJydQ==',
  },
  {
    label: 'github',
    logo: githubLogo,
    size: 'size-8',
    href: 'https://github.com/rezarahem?tab=repositories',
  },
  {
    label: 'telegram',
    logo: telegramLogo,
    size: 'size-8',
    href: 'https://t.me/rahem_public',
  },
  {
    label: 'youtube',
    logo: youtubeLogo,
    size: 'size-10',
    href: 'https://youtube.com/@rezarahem?si=SlOTAYPFhfwzHLBz',
  },
];

const importantLinks = [
  {
    label: 'درباره ما',
    path: '/about-us',
  },
  {
    label: 'Next.js',
    path: '/courses/next-js',
  },
];

const telegramSupport = (
  <Link
    target='_blank'
    href='https://t.me/reza_rahem'
    className='font-bold text-blue-500 dark:text-blue-300'
  >
    تلگرام
  </Link>
);

const FooterClient = () => {
  return (
    <Container className='flex flex-col justify-between gap-10 py-10 md:flex-row'>
      <div className='flex flex-col gap-y-10'>
        <Logo className='text-center md:text-right' />
        <p className='mx-auto max-w-96 text-balance text-center hover:cursor-default md:text-right'>
          در rahem.dev، با ویدیوهای ساده، برنامه نویسی وب رو آموزش می‌دم. هدفم
          اینه که یه محیط دوستانه و راحت براتون فراهم کنم تا بدون هیچ مشکلی
          برنامه نویسی رو یاد بگیرید. خودمم این مشکلات رو تجربه کردم، پس می‌دونم
          چقدر ممکنه سخت باشه. خوش‌حال میشم که در این مسیر همراهتون باشم.
        </p>
        <p className='text-balance text-center md:text-right'>
          شما می‌تونید از طریق {telegramSupport} با من در ارتباط باشید.
        </p>
      </div>

      <div className='mt-auto flex flex-col items-center gap-y-4 md:items-end'>
        <div className='relative mb-8 size-24'>
          <Link
            referrerPolicy='origin'
            target='_blank'
            href='https://trustseal.enamad.ir/?id=464051&Code=Z1RowILl6HX4Zg08srxJNtl6E40T2K1e'
          >
            <Image
              referrerPolicy='origin'
              src={enamadLogo}
              alt='enamad'
              id='Z1RowILl6HX4Zg08srxJNtl6E40T2K1e'
              fill
              sizes='50vw'
            />
          </Link>
        </div>
        <div className='flex items-center justify-center gap-x-4'>
          {socialIcons.map(({ label, logo, size, href }) => (
            <div key={label} className={cn('relative', size)}>
              <Link href={href} target='_blank'>
                <Image
                  src={logo}
                  alt={label}
                  fill
                  sizes='33vw'
                  className='opacity-70 transition-opacity duration-300 hover:opacity-100 dark:opacity-50 dark:invert'
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FooterClient;
