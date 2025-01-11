import { Todo } from '@prisma/client';

import { inspectPrismaError } from '@/utils/prismaErrorUtils';
import { prisma } from '@/lib/prisma';

type TodoResponse = {
  todos?: Todo[];
  error?: string;
}

export async function fetchTodos(guestUserId: string | undefined): Promise<TodoResponse> {
  if (!guestUserId) {
    return { todos: [] };
  }

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
