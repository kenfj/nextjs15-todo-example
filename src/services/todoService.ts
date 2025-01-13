import { Todo } from '@prisma/client';

import { TodoSchemaType } from '@/models/todo';
import { createTodo, findAllByUserId } from '@/repositories/todo_repository';
import { inspectPrismaError } from '@/utils/prismaErrorUtils';

type TodoResponse = {
  todos?: Todo[];
  error?: string;
}

export async function fetchTodos(guestUserId: string | undefined): Promise<TodoResponse> {
  if (!guestUserId) {
    return { todos: [] };
  }

  try {
    const todos = await findAllByUserId(Number(guestUserId));
    return { todos };
  } catch (error) {
    console.error(error);
    const detailedError = inspectPrismaError(error);
    return { error: detailedError };
  }
}

export async function saveTodo(data: TodoSchemaType, userId: number) {
  await createTodo({
    ...data,
    user: { connect: { id: userId } },
  });
}
