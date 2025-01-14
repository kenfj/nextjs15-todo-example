'use server';

import { redirect } from 'next/navigation';

import { TodoFormState } from '@/models/todo';
import { saveTodo, deleteTodo } from '@/services/todoService';
import { getCookie } from '@/utils/cookieUtils';

export async function createTodoAction(prevState: TodoFormState, formData: FormData) {
  const userId = await getCookie('user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const result = await saveTodo(formData, Number(userId));

  if (!result.success) {
    return {
      ...prevState,
      ...result,
    };
  }

  redirect('/');
}

export async function deleteTodoAction(todoId: number) {
  const userId = await getCookie('user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  await deleteTodo(todoId, Number(userId));

  redirect('/');
}
