'use server';

import { Prisma,PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

import { getCookie } from '@/utils/cookieUtils';

const prisma = new PrismaClient();

type CreateTodoData = Prisma.TodoCreateInput;

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string;
  const completed = formData.get('completed') === 'true';
  const userId = await getCookie('guest_user_id');
  const createdAt = new Date();

  if (!userId) {
    throw new Error('User ID not found in cookies');
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
