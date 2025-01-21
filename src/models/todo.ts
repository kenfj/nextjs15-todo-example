import { Prisma, Todo } from '@prisma/client';
import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  completed: z.boolean().optional(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;

// use only fieldErrors and skip not so useful formErrors
type TodoFieldErrors = z.inferFlattenedErrors<typeof TodoSchema>['fieldErrors'];

export type TodoFormState = {
  success: boolean,
  message: string,
  data: TodoSchemaType,
  errors: TodoFieldErrors,
};

export type DeleteTodoState = {
  success: boolean,
  message: string,
};

export type TodoFetchResponse = {
  todos?: Todo[];
  error?: string;
}
