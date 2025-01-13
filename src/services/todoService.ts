import { Todo } from '@prisma/client';

import { TodoCreateInput, TodoSchema } from '@/models/todo';
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

export function validateTodo(formData: FormData) {
  return TodoSchema.safeParse({
    title: formData.get('title') as string,
    completed: formData.get('completed') === 'true',
  });
}

export async function saveTodo(input: TodoCreateInput) {
  await createTodo({
    title: input.title,
    completed: input.completed,
    user: { connect: { id: input.user.connect?.id } },
  });
}
