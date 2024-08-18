'use server';

import axios from 'axios';

export const SentOtp = async (
  phone: string,
  otp: string,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const res = await axios.post(
      'https://console.melipayamak.com/api/send/shared/715c9ca1b60d4dbeb60277761fbb9d7d',
      {
        bodyId: 207431,
        to: phone,
        args: [` ${otp}`],
      },
    );

    const { data, status, statusText } = res;

    if (status === 200 && statusText?.toLowerCase() === 'ok' && data) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      errorMessage: 'اختلال در شبکه، مجددا تلاش کنید',
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'اختلال در شبکه، مجددا تلاش کنید',
    };
  }
};
