import { Todo } from '@prisma/client';
import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().trim()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(10, { message: "Title mus be less than 10 characters for testing" }),
  completed: z.boolean().optional(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;

// use only fieldErrors and skip not so useful formErrors
type TodoFieldErrors = z.inferFlattenedErrors<typeof TodoSchema>['fieldErrors'];

export type FormState<FORMDATA, ERRORS> = {
  data?: FORMDATA,
  error?: string,
  errors?: ERRORS,
};

export type TodoFormState = FormState<TodoSchemaType, TodoFieldErrors>;

export type FuncState<T> = {
  data?: T,
  error?: string,
};

export type DeleteTodoState = FuncState<Todo>;

export type TodoFetchResponse = FuncState<Todo[]>;
