import { Todo } from '@prisma/client';

import { TodoSchema, TodoSchemaType, TodoFormState } from '@/models/todo';
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

export async function saveTodo(formData: FormData, userId: number): Promise<TodoFormState> {
  const todoFormData: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };

  const validatedFields = TodoSchema.safeParse(todoFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      data: todoFormData,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      prismaError: "",
    };
  }

  try {
    await createTodo({
      ...validatedFields.data,
      user: { connect: { id: userId } },
    });
    return {
      success: true,
      data: todoFormData,
      zodErrors: {},
      prismaError: "",
    };
  } catch (error) {
    console.error(error);
    const detailedError = inspectPrismaError(error);
    return {
      success: false,
      data: todoFormData,
      zodErrors: {},
      prismaError: detailedError,
    };
  }
}
