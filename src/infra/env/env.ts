import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  DATABASE_URL: z.string().url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
