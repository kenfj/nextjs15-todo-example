import { prisma } from '@/lib/prisma';
import { TodoCreateInput } from '@/models/todo';

export async function createTodo(input: TodoCreateInput) {
  return await prisma.todo.create({ data: { ...input } });
}

export async function findAllByUserId(userId: number) {
  return await prisma.todo.findMany({ where: { userId } });
}

export async function deleteTodoById(todoId: number, userId: number) {
  return await prisma.todo.deleteMany({ where: { id: todoId, userId } });
}
