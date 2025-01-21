import { Prisma, Todo } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function createTodo(input: Prisma.TodoCreateInput): Promise<Todo> {
  return await prisma.todo.create({ data: { ...input } });
}

export async function findAllByUserId(userId: number): Promise<Todo[]> {
  return await prisma.todo.findMany({ where: { userId } });
}

export async function deleteTodoById(todoId: number, userId: number): Promise<Todo> {
  return await prisma.todo.delete({ where: { id: todoId, userId } });
}
