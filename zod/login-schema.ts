import * as z from 'zod';

export const PhoneNumberSchema = z.string().regex(/^09\d{9}$/, {
  message: 'شماره همراه باید ۱۱ عدد باشد و با ۰۹ شروع شود',
});

const persianAlphabet = 'اآبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیءئإأؤًٌٍَُِّْٰۀٔڤڠ';
const persianCharRegex = new RegExp(`^[${persianAlphabet}\\s]+$`);
export const UserNameSchema = z
  .string()
  .min(1, 'ثبت نام الزامی است.')
  .min(3, 'نام حداقل باید ۳ حرف باشد.')
  .regex(persianCharRegex, {
    message: 'تنها امکان ثبت نام به زبان فارسی ممکن است',
  });

export const OtpSchema = z.string().regex(/^\d{5}$/, {
  message: 'کد تایید باید ۵ عدد باشد',
});
