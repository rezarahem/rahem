'use server';

import { redirect } from 'next/navigation';

export const RedirectTo = async (href: string) => {
  redirect(href);
};
