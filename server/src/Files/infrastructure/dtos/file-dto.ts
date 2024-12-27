import { z } from 'zod';

export const FileSchema = z.object({
  file: z.instanceof(File),
  bucketName: z.enum(['user', 'resumes']),
  userId: z.number(),
});

export type FileSchemaDto = z.infer<typeof FileSchema>;

export const GetFileSchema = z.object({
  userId: z.string(),
});

export type GetFileSchemaDto = z.infer<typeof GetFileSchema>;
