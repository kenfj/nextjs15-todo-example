'use server';

import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { getCookie } from '@/utils/cookieUtils';

type CreateTodoData = Prisma.TodoCreateInput;

const schema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  completed: z.boolean().optional(),
});

// use only fieldErrors and skip not so useful formErrors
type TodoFieldErrors = z.inferFlattenedErrors<typeof schema>['fieldErrors'];;
export type TodoErrors = { "errors": TodoFieldErrors }

export async function createTodoAction(prevState: TodoErrors, formData: FormData) {
  const title = formData.get('title') as string;
  const completed = formData.get('completed') === 'true';
  const userId = await getCookie('guest_user_id');
  const createdAt = new Date();

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const validatedFields = schema.safeParse({ title, completed });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newTodo: CreateTodoData = {
    title,
    completed,
    user: { connect: { id: Number(userId) } },
    createdAt,
    updatedAt: createdAt,
  };

  await prisma.todo.create({
    data: newTodo,
  });

  redirect('/');
}
