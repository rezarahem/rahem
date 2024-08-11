'use server';

import { revalidatePath } from 'next/cache';
import { logout } from './auth';
import { redirect } from 'next/navigation';

export const Logout = async () => {
  await logout();
  redirect('/');
};
