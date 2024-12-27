import { randomUUID } from 'crypto';
import { z } from 'zod';

export const PrintResumeSchema = z.object({
    title: z.string({ message: 'Title is Required'}),
    data: z.any(),
    locked: z.boolean().default(false),
    userId :z.string()
});

export type PrintResumeDto = z.infer<typeof PrintResumeSchema>;


export const getResumeSchema = z.object({
    userId :z.string()
});

export type getResumeDto = z.infer<typeof getResumeSchema>;




