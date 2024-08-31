'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const LogouClient = async () => {
  try {
    cookies().set('session', '', { expires: new Date(0) });
    redirect('/');
  } catch (error) {
    // console.log(error);
  }
};
