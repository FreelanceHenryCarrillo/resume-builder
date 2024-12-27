import { z } from 'zod';

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

export const RegisterUserSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    fullname: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['validatePassword'],
  });
