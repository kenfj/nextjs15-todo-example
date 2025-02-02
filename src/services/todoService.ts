import { auth } from '@/auth';
import { DeleteTodoState, TodoFetchResponse, TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { createTodo, deleteTodoById, findAllByUserId } from '@/repositories/todo_repository';
import { errorName, logPrismaError } from '@/utils/errorUtils';

export async function findAllTodos(): Promise<TodoFetchResponse> {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const todos = await findAllByUserId(userId);
    return { data: todos };
  } catch (e) {
    logPrismaError(e, "findAllTodos");
    return { error: errorName(e) };
  }
}

export async function saveTodo(formData: FormData): Promise<TodoFormState> {
  const data: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };

  const result = TodoSchema.safeParse(data);

  if (!result.success) {
    console.warn("server side validation error", result.error.flatten())
    return { data, errors: result.error.flatten().fieldErrors };
  }

  console.info(`Saving Todo: ${JSON.stringify(result.data)}`)

  const session = await auth();
  const userId = session?.user?.id;

  try {
    await createTodo({ ...result.data, user: { connect: { id: userId } } });
    return { data };
  } catch (e) {
    logPrismaError(e, "saveTodo");
    return { data, error: errorName(e) };
  }
}

export async function deleteTodo(todoId: number): Promise<DeleteTodoState> {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const todo = await deleteTodoById(todoId, userId);
    return { data: todo };
  } catch (e) {
    logPrismaError(e, "deleteTodo");
    return { error: errorName(e) };
  }
}
