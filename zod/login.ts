import * as z from 'zod';

const LoginSchema = z.object({
  phone: z.string().min(1),
});

export default LoginSchema;
