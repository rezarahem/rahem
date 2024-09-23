import Link from 'next/link';

type NavLinksProps = {
  onToggle?: () => void;
};

const NavLinks = ({ onToggle }: NavLinksProps) => {
  return (
    <div className='flex flex-col gap-4 sm:flex-row'>
      <Link
        className='flex gap-1'
        onClick={(e) => {
          if (onToggle) {
            onToggle();
          }
        }}
        href='/courses/nextjs'
      >
        دوره <span className='translate-y-px'>Nextjs</span>
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
