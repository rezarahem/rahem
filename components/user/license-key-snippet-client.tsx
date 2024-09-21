'use client';

import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export type LicenseKeySnippetProps = {
  license: string;
  coursesTitles: string[];
};

const LicenseKeySnippetClient = ({
  license,
  coursesTitles,
}: LicenseKeySnippetProps) => {
  return (
    <div className='rounded-md border'>
      <div className='space-y-3 border-b px-3 py-4'>
        {coursesTitles.map((title) => (
          <h2 key={title} className='font-bold'>
            {title}
          </h2>
        ))}
      </div>

      <div className='flex items-center gap-x-3 p-2'>
        <button
          className='z-10 rounded-md p-1 hover:bg-slate-500/15'
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(license);
            toast.success('لایسنس کپی شد');
          }}
        >
          <Copy className='size-5' />
        </button>
        <p className='text-sm'>{license.substring(0, 30)}...</p>
      </div>
    </div>
  );
};

export default LicenseKeySnippetClient;
