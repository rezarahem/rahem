'use server';

import axios from 'axios';

export const Otp = async (
  phone: string,
): Promise<{
  code?: string;
  errorMessage?: string;
}> => {
  try {
    const res = await axios.post(
      'https://console.melipayamak.com/api/send/otp/715c9ca1b60d4dbeb60277761fbb9d7d',
      {
        to: phone,
      },
    );

    const { data, status, statusText } = res;
    console.log(res);

    // if (status !== 200 || !statusText || statusText.toLowerCase() !== 'ok') {
    //   const errorMessage = 'خطا در ارسال کد تایید، مجددا تلاش کنید';
    //   return {
    //     errorMessage,
    //   };
    // }

    // if (!data || !data.code) {
    //   const errorMessage = 'پاسخ نامعتبر، مجددا تلاش کنید';
    //   return {
    //     errorMessage,
    //   };
    // }

    return {
      code: '22222',
    };
  } catch (error) {
    // console.log('[Otp]', error);
    if (axios.isAxiosError(error)) {
      // console.log(error);
      const errorMessage = 'اختلال در شبکه، مجددا تلاش کنید';
      return { errorMessage };
    } else {
      return { errorMessage: 'خطایی رخ داد، مجددا تلاش کنید' };
    }
  }
};
