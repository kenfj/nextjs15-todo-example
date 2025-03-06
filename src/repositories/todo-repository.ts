import { Prisma, Todo } from '@prisma/client';

import prisma from '@/lib/prisma';

// PrismaはfindManyやfindFirstはWhere句のクエリがundefinedの場合条件なしで検索する仕様なので注意
// https://qiita.com/bon10/items/cb59c00fdd66ae880878

export async function createTodo(input: Prisma.TodoCreateInput): Promise<Todo> {
  return await prisma.todo.create({ data: { ...input } });
}

export async function getById(id: number, userId?: string) {
  if (userId === undefined)
    throw new RangeError("User ID is undefined");

  return await prisma.todo.findUniqueOrThrow({
    where: { id, userId },
  });
}

export async function findAllByUserId(userId?: string, orderBy: keyof Todo = 'createdAt'): Promise<Todo[]> {
  if (userId === undefined)
    throw new RangeError("User ID is undefined");

  return await prisma.todo.findMany({
    where: { userId },
    orderBy: { [orderBy]: 'asc' },
  });
}

export async function deleteTodoById(id: number, userId?: string): Promise<Todo> {
  if (userId === undefined)
    throw new RangeError("User ID is undefined");

  return await prisma.todo.delete({
    where: { id, userId },
  });
}
