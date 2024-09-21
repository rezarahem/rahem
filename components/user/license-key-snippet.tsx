import { decryptLicense } from '@/actions/auth/auth';
import LicenseKeySnippetClient, {
  LicenseKeySnippetProps,
} from './license-key-snippet-client';

const LicenseKeySnippet = async ({
  license,
  coursesTitles,
}: LicenseKeySnippetProps) => {
  const decrypedLicense = await decryptLicense(license);

  return (
    <LicenseKeySnippetClient
      license={decrypedLicense}
      coursesTitles={coursesTitles}
    />
  );
};

export default LicenseKeySnippet;
