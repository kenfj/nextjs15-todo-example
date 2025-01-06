import { PrismaClient, Todo } from '@prisma/client';

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
    return { error: 'Failed to fetch todos' };
  }
}
