'use server';
import { getSession } from './auth';

export const GetSessionAction = async () => {
  return await getSession();
};
