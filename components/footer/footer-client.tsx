'use client';

import enamadLogo from '@/public/enamad.png';
import Container from '../ui/container';
import { FaYoutube } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import Logo from '../ui/logo';

const socialIcons = [
  {
    label: 'youtube',
    href: 'https://youtube.com/@rezarahem?si=SlOTAYPFhfwzHLBz',
    icon: <FaYoutube className='size-5' />,
  },
  {
    label: 'instagram',
    href: 'https://www.instagram.com/rahem.dev?igsh=MXBqcW5nYnBhemJydQ==',
    icon: <IoLogoInstagram className='size-5' />,
  },
  {
    label: 'github',
    href: 'https://github.com/rezarahem?tab=repositories',
    icon: <FaGithub className='size-5' />,
  },
  {
    label: 'telegram',
    href: 'https://t.me/rahem_public',
    icon: <FaTelegram className='size-5' />,
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
        <Logo linkClassName='h-8' imgClassName='md:object-right' />
        {/* <Logo className='text-center md:text-right' /> */}
        <p className='text-balance text-center md:text-right'>
          شما می‌تونید از طریق {telegramSupport} با من در ارتباط باشید.
        </p>
      </div>

      <div className='mt-auto flex flex-col items-center gap-y-4 md:items-end'>
        <Link
          referrerPolicy='origin'
          target='_blank'
          href='https://trustseal.enamad.ir/?id=464051&Code=Z1RowILl6HX4Zg08srxJNtl6E40T2K1e'
          className='relative mb-7 size-24 md:-ml-3'
        >
          <Image
            referrerPolicy='origin'
            src={enamadLogo}
            alt='enamad'
            id='Z1RowILl6HX4Zg08srxJNtl6E40T2K1e'
            fill
            sizes='33vw'
          />
        </Link>
        <div className='flex items-center justify-center gap-x-4'>
          {socialIcons.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              target='_blank'
              className='opacity-70 transition-opacity duration-300 hover:opacity-100'
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FooterClient;
