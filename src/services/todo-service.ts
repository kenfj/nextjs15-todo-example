import { auth } from '@/auth';
import { DeleteTodoState, TodoFetchResponse, TodoFormState, TodoSchema } from '@/models/todo';
import { createTodo, deleteTodoById, findAllByUserId } from '@/repositories/todo-repository';
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
  const formObject = Object.fromEntries(formData.entries());
  const { data, success, error } = TodoSchema.safeParse(formObject);

  if (!success) {
    console.warn("server side validation error", error.flatten())
    return { data, errors: error.flatten().fieldErrors };
  }

  console.info(`Saving Todo: ${JSON.stringify(data)}`)

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const created = await createTodo({ ...data, user: { connect: { id: userId } } });
    return { data: created };
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
