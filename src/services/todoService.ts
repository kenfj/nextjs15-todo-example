import { DeleteTodoState, TodoFetchResponse, TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { createTodo, deleteTodoById, findAllByUserId } from '@/repositories/todo_repository';
import { getUserId } from '@/utils/cookieUtils';
import { inspectPrismaError } from '@/utils/prismaErrorUtils';

export async function findAllTodos(): Promise<TodoFetchResponse> {
  try {
    const userId = await getUserId();
    const todos = await findAllByUserId(Number(userId));
    return { data: todos };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error("ERROR in findAllTodos: %s", errorDetails);

    return { error: (e instanceof Error) ? e.name : `${e}` };
  }
}

export async function saveTodo(formData: FormData): Promise<TodoFormState> {
  const data: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };

  const result = TodoSchema.safeParse(data);

  if (!result.success) {
    return { data, errors: result.error.flatten().fieldErrors };
  }

  try {
    const userId = await getUserId();
    await createTodo({ ...result.data, user: { connect: { id: Number(userId) } } });
    return { data };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error(errorDetails);

    return { data, error: (e instanceof Error) ? e.name : `${e}` };
  }
}

export async function deleteTodo(todoId: number): Promise<DeleteTodoState> {
  try {
    const userId = await getUserId();
    const todo = await deleteTodoById(todoId, Number(userId));
    return { data: todo };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error(errorDetails);

    return { error: (e instanceof Error) ? e.name : `${e}` };
  }
}
