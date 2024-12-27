import { z } from 'zod';

export const UserInfoSchema = z.object({
  email: z.string().email('Invalid email format'),
});

// Tipado inferido automáticamente por Zod
export type UserInfoDto = z.infer<typeof UserInfoSchema>;
