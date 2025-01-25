import { DeleteTodoState, TodoFetchResponse, TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { createTodo, deleteTodoById, findAllByUserId } from '@/repositories/todo_repository';
import { getUserId } from '@/utils/cookieUtils';
import { errorName, inspectPrismaError } from '@/utils/errorUtils';

export async function findAllTodos(): Promise<TodoFetchResponse> {
  try {
    const userId = await getUserId();
    const todos = await findAllByUserId(userId);
    return { data: todos };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error("ERROR in findAllTodos: %s", errorDetails);

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
    return { data, errors: result.error.flatten().fieldErrors };
  }

  try {
    const userId = await getUserId();
    await createTodo({ ...result.data, user: { connect: { id: userId } } });
    return { data };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error(errorDetails);

    return { data, error: errorName(e) };
  }
}

export async function deleteTodo(todoId: number): Promise<DeleteTodoState> {
  try {
    const userId = await getUserId();
    const todo = await deleteTodoById(todoId, userId);
    return { data: todo };
  } catch (e) {
    const errorDetails = inspectPrismaError(e);
    console.error(errorDetails);

    return { error: errorName(e) };
  }
}
