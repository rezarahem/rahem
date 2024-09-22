import Link from 'next/link';

type NavLinksProps = {
  onToggle?: () => void;
};

const NavLinks = ({ onToggle }: NavLinksProps) => {
  return (
    <div className='flex flex-col gap-4 sm:flex-row'>
      <Link
        onClick={(e) => {
          if (onToggle) {
            onToggle();
          }
        }}
        href='/courses/nextjs'
      >
        دوره Nextjs
      </Link>
      <Link
        onClick={(e) => {
          if (onToggle) {
            onToggle();
          }
        }}
        href='/about-us'
      >
        درباره ما
      </Link>
    </div>
  );
};

export default NavLinks;
