import { Todo } from '@prisma/client';
import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  completed: z.boolean().optional(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;

// use only fieldErrors and skip not so useful formErrors
type TodoFieldErrors = z.inferFlattenedErrors<typeof TodoSchema>['fieldErrors'];

export type FormState<FORMDATA, ERRORS> = {
  success: boolean,
  message: string,
  data: FORMDATA,
  errors: ERRORS,
};

export type TodoFormState = FormState<TodoSchemaType, TodoFieldErrors>;

export type FuncState<T> = {
  success: boolean,
  message?: string,
  data?: T,
};

export type DeleteTodoState = FuncState<Todo>;

export type TodoFetchResponse = FuncState<Todo[]>;
