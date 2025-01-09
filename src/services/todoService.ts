import { PrismaClient, Todo } from '@prisma/client';
import { inspectPrismaError } from '../utils/prismaErrorUtils';

const prisma = new PrismaClient();

type TodoResponse = {
  todos?: Todo[];
  error?: string;
}

export async function fetchTodos(guestUserId: string): Promise<TodoResponse> {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: Number(guestUserId),
      },
    });
    return { todos };
  } catch (error) {
    console.error(error);
    const detailedError = inspectPrismaError(error);
    return { error: detailedError };
  }
}