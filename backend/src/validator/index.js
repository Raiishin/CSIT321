import { z } from 'zod';
import userTypeEnum from '../constants/userTypeEnum.js';

export const createUserSchema = z
  .object({
    name: z.coerce.string().min(1),
    address: z.coerce.string().min(1),
    email: z.coerce.string().min(1).email(),
    password: z.coerce.string().min(8),
    type: z.nativeEnum(userTypeEnum),
    modules: z.array(z.string()).optional(),
    //enrollmentStatus: z.enum([0,1]).optional()
    enrollmentStatus: z.number().int().max(1).optional()
  })
  .strict();

export const updateUserSchema = z
  .object({
    id: z.coerce.string().min(1),
    name: z.coerce.string().min(1),
    address: z.coerce.string().min(1),
    email: z.coerce.string().min(1).email(),
    isLocked: z.boolean().optional()
  })
  .strict();

export const userIdSchema = z.object({ userId: z.coerce.string().min(1) }).strict();

export const loginSchema = z
  .object({
    email: z.coerce.string().min(1).email(),
    password: z.coerce.string().min(8)
  })
  .strict();
