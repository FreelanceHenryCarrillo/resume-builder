import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Tipado inferido automáticamente por Zod
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
