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
        args: [otp],
      },
    );

    const { data, status, statusText } = res;

    if (status !== 200 || !statusText || statusText.toLowerCase() !== 'ok') {
      const errorMessage = 'خطا در ارسال کد تایید، مجددا تلاش کنید';
      return {
        success: false,
        errorMessage,
      };
    }

    if (!data) {
      const errorMessage = 'پاسخ نامعتبر، مجددا تلاش کنید';
      return {
        success: false,
        errorMessage,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    // console.log('[Otp]', error);
    if (axios.isAxiosError(error)) {
      // console.log(error);
      const errorMessage = 'اختلال در شبکه، مجددا تلاش کنید';
      return { errorMessage, success: false };
    } else {
      return { errorMessage: 'خطایی رخ داد، مجددا تلاش کنید', success: false };
    }
  }
};
