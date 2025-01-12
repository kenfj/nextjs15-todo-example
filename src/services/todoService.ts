import { Todo } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { TodoCreateInput, TodoSchema } from '@/models/todo';
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

export function validateTodo(formData: FormData) {
  return TodoSchema.safeParse({
    title: formData.get('title') as string,
    completed: formData.get('completed') === 'true',
  });
}

export async function saveTodo(input: TodoCreateInput) {
  await prisma.todo.create({
    data: {
      title: input.title,
      completed: input.completed,
      user: { connect: { id: input.user.connect?.id } },
    },
  });
}
