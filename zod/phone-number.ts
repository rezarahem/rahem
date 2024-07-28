import * as z from 'zod';

export const PhoneNumberSchema = z.string().regex(/^09\d{9}$/, {
  message: 'شماره همراه باید ۱۱ عدد باشد و با ۰۹ شروع شود',
});

export const OtpSchema = z.object({
  otp: z.string().regex(/^\d{5}$/, {
    message: 'کد تایید باید ۵ عدد باشد',
  }),
});
