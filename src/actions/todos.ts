'use server';

import { redirect } from 'next/navigation';

import { TodoErrors } from '@/models/todo';
import { saveTodo, validateTodo } from '@/services/todoService';
import { getCookie } from '@/utils/cookieUtils';

export async function createTodoAction(prevState: TodoErrors, formData: FormData) {
  const userId = await getCookie('guest_user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const validatedFields = validateTodo(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await saveTodo(validatedFields.data, Number(userId));

  redirect('/');
}
