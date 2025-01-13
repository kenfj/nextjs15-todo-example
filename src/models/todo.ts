import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  completed: z.boolean().optional(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;

// use only fieldErrors and skip not so useful formErrors
export type TodoFieldErrors = z.inferFlattenedErrors<typeof TodoSchema>['fieldErrors'];

export type TodoFormState = {
  data: TodoSchemaType,
  errors: TodoFieldErrors,
};

export type TodoCreateInput = Prisma.TodoCreateInput;
