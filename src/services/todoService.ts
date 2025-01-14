import { TodoFetchResponse, TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { createTodo, findAllByUserId } from '@/repositories/todo_repository';
import { inspectPrismaError } from '@/utils/prismaErrorUtils';

export async function findAllTodos(userId: string | undefined): Promise<TodoFetchResponse> {
  if (!userId) {
    return { todos: [] };
  }

  try {
    const todos = await findAllByUserId(Number(userId));
    return { todos };
  } catch (error) {
    const detailedError = inspectPrismaError(error);
    console.error(detailedError);
    return {
      error: (error instanceof Error) ? error.name : `${error}`,
    };
  }
}

export async function saveTodo(formData: FormData, userId: number): Promise<TodoFormState> {
  const todoFormData: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };

  const validatedFields = TodoSchema.safeParse(todoFormData);

  const defaultResponse: TodoFormState = {
    success: false,
    data: todoFormData,
    zodErrors: {},
    prismaError: "",
  };

  if (!validatedFields.success) {
    const zodErrors = validatedFields.error.flatten().fieldErrors;
    return { ...defaultResponse, zodErrors };
  }

  try {
    await createTodo({
      ...validatedFields.data,
      user: { connect: { id: userId } },
    });
    return { ...defaultResponse, success: true };
  } catch (error) {
    const detailedError = inspectPrismaError(error);
    console.error(detailedError);
    const prismaError = (error instanceof Error) ? error.name : `${error}`;
    return { ...defaultResponse, prismaError };
  }
}
