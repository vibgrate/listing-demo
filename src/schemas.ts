import { z } from 'zod';

export const healthSchema = z.object({
  status: z.literal('ok'),
  uptimeMs: z.number().nonnegative(),
  now: z.string(),
});

export const echoSchema = z.object({
  message: z.string().min(1).max(500),
});

export const itemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(120),
  createdAt: z.string(),
});

export type EchoInput = z.infer<typeof echoSchema>;
export type Item = z.infer<typeof itemSchema>;
