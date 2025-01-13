'use server';

import { redirect } from 'next/navigation';

import { TodoFormState, TodoSchema, TodoSchemaType } from '@/models/todo';
import { saveTodo } from '@/services/todoService';
import { getCookie } from '@/utils/cookieUtils';

export async function createTodoAction(prevState: TodoFormState, formData: FormData) {
  const userId = await getCookie('guest_user_id');

  if (!userId) {
    throw new Error('User ID not found in cookies');
  }

  const todoFormData: TodoSchemaType = {
    title: `${formData.get('title')}`,              // empty string if not defined
    completed: formData.get('completed') === 'on',  // checkbox value is on/off
  };
  const validatedFields = TodoSchema.safeParse(todoFormData);

  if (!validatedFields.success) {
    return {
      ...prevState,
      data: { ...todoFormData },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await saveTodo(validatedFields.data, Number(userId));

  redirect('/');
}
