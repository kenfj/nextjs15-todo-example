'use server';

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

  if (!result.success) {
    return result;
  }

  redirect('/');
}

export async function deleteTodoAction(prevState: DeleteTodoState, formData: FormData) {
  const userId = await getCookie('user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const todoId = formData.get("todoId");

  if (!todoId) {
    return { success: false, message: 'Todo ID not found in form data' };
  }

  const result = await deleteTodo(Number(todoId), Number(userId));

  if (!result.success) {
    return result;
  }

  redirect('/');
}
