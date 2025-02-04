import { Prisma, Todo } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function createTodo(input: Prisma.TodoCreateInput): Promise<Todo> {
  return await prisma.todo.create({ data: { ...input } });
}

export async function findAllByUserId(userId: string | undefined, orderBy: keyof Todo = 'createdAt'): Promise<Todo[]> {
  if (userId === undefined) {
    throw new Error("User ID is undefined");
  }
  return await prisma.todo.findMany({ where: { userId }, orderBy: { [orderBy]: 'asc' } });
}

export async function deleteTodoById(todoId: number, userId: string | undefined): Promise<Todo> {
  if (userId === undefined) {
    throw new Error("User ID is undefined");
  }
  return await prisma.todo.delete({ where: { id: todoId, userId } });
}
