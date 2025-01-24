import { DeleteTodoState, TodoFetchResponse, TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { createTodo, deleteTodoById, findAllByUserId } from '@/repositories/todo_repository';
import { inspectPrismaError } from '@/utils/prismaErrorUtils';

export async function findAllTodos(userId: string | undefined): Promise<TodoFetchResponse> {
  if (!userId) {
    return { data: [] };
  }

  try {
    const todos = await findAllByUserId(Number(userId));
    return { data: todos };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error("ERROR in findAllTodos: %s", errorDetails);

    return { error: (e instanceof Error) ? e.name : `${e}` };
  }
}

export async function saveTodo(formData: FormData, userId: number): Promise<TodoFormState> {
  const data: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };

  const result = TodoSchema.safeParse(data);

  if (!result.success) {
    return { data, errors: result.error.flatten().fieldErrors };
  }

  try {
    await createTodo({...result.data, user: { connect: { id: userId } },
    });
    return { data };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error(errorDetails);

    return { data, error: (e instanceof Error) ? e.name : `${e}` };
  }
}

export async function deleteTodo(todoId: number, userId: number): Promise<DeleteTodoState> {
  try {
    const todo = await deleteTodoById(todoId, userId);
    return { data: todo };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error(errorDetails);

    return { error: (e instanceof Error) ? e.name : `${e}` };
  }
}
