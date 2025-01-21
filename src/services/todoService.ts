import { DeleteTodoState, TodoFetchResponse, TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { createTodo, deleteTodoById, findAllByUserId } from '@/repositories/todo_repository';
import { inspectPrismaError } from '@/utils/prismaErrorUtils';

export async function findAllTodos(userId: string | undefined): Promise<TodoFetchResponse> {
  if (!userId) {
    return { todos: [] };
  }

  try {
    const todos = await findAllByUserId(Number(userId));
    return { todos };
  } catch (e) {
    const error = inspectPrismaError(e);
    console.error("ERROR in findAllTodos: %s", error);

    return { error: (e instanceof Error) ? e.name : `${e}` };
  }
}

export async function saveTodo(formData: FormData, userId: number): Promise<TodoFormState> {
  const todoFormData: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };

  const result = TodoSchema.safeParse(todoFormData);

  const res: TodoFormState = {
    success: false,
    message: "",
    data: todoFormData,
    errors: {},
  };

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { ...res, errors };
  }

  try {
    await createTodo({
      ...result.data,
      user: { connect: { id: userId } },
    });
    return { ...res, success: true };
  } catch (e) {
    const error = inspectPrismaError(e);
    console.error(error);

    const message = (e instanceof Error) ? e.name : `${e}`;
    return { ...res, message };
  }
}

export async function deleteTodo(todoId: number, userId: number): Promise<DeleteTodoState> {
  const res: DeleteTodoState = {
    success: false,
    message: "",
  };

  try {
    const deletedTodo = await deleteTodoById(todoId, userId);
    return { ...res, success: true, message: `Deleted todo with id: ${deletedTodo.id}` };
  } catch (e) {
    const error = inspectPrismaError(e);
    console.error(error);

    const message = (e instanceof Error) ? e.name : `${e}`;
    return { ...res, message };
  }
}
