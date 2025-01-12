import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  completed: z.boolean().optional(),
});

// use only fieldErrors and skip not so useful formErrors
export type TodoFieldErrors = z.inferFlattenedErrors<typeof TodoSchema>['fieldErrors'];
export type TodoErrors = { errors: TodoFieldErrors };
