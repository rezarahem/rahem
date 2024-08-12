import Container from '../ui/container';
import ThemeController from '../ui/theme-controller';
import FooterClient from './footer-client';

const fullYear = () => {
  const fullDate = new Date();
  return fullDate.getFullYear();
};

const Footer = () => {
  return (
    <footer className='border-t'>
      <FooterClient />

      <div className='border-t'>
        <Container className='flex items-center justify-between py-3'>
          <ThemeController />
          <div className='cursor-default'>
            <p
              dir='ltr'
              className='translate-y-px text-sm text-muted-foreground'
            >
              &copy; {fullYear()} rahem.dev
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
