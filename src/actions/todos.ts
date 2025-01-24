'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { DeleteTodoState, TodoFormState } from '@/models/todo';
import { deleteTodo, saveTodo } from '@/services/todoService';
import { getCookie } from '@/utils/cookieUtils';

export async function createTodoAction(prevState: TodoFormState, formData: FormData) {
  const userId = await getCookie('user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const result = await saveTodo(formData, Number(userId));

  if (result.error) {
    return result;
  }

  redirect('/');
}

export async function deleteTodoAction(todoId: number): Promise<DeleteTodoState> {
  const userId = await getCookie('user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const result = await deleteTodo(todoId, Number(userId));

  if (result.error) {
    return result;
  }

  revalidatePath('/');
  return result;
}
