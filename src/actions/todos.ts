'use server';

import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { TodoErrors, TodoSchema } from '@/models/todo';
import { getCookie } from '@/utils/cookieUtils';

export async function createTodoAction(prevState: TodoErrors, formData: FormData) {
  const userId = await getCookie('guest_user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const validatedFields = TodoSchema.safeParse({
    title: formData.get('title') as string,
    completed: formData.get('completed') === 'true',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.todo.create({
    data: {
      title: validatedFields.data.title,
      completed: validatedFields.data.completed,
      user: { connect: { id: Number(userId) } },
    },
  });

  redirect('/');
}
