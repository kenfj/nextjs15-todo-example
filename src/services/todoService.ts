import { PrismaClient, Todo } from '@prisma/client';
import { inspectPrismaError } from '../utils/prismaErrorUtils';

const prisma = new PrismaClient();

type TodoResponse = {
  todos?: Todo[];
  error?: string;
}

export async function fetchTodos(): Promise<TodoResponse> {
  try {
    const todos = await prisma.todo.findMany();
    return { todos };
  } catch (error) {
    console.error(error);
    const detailedError = inspectPrismaError(error);
    return { error: detailedError };
  }
}
