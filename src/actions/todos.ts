"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DeleteTodoState, TodoFormState } from "@/models/todo";
import { deleteTodo, saveTodo } from "@/services/todo-service";

export async function createTodoAction(prevState: TodoFormState, formData: FormData) {
  const result = await saveTodo(formData);

  if (result.error || result.errors) {
    return result;
  }

  redirect("/");
}

export async function deleteTodoAction(id: number): Promise<DeleteTodoState> {
  const result = await deleteTodo(id);

  if (!result.error) {
    revalidatePath("/");
  }

  return result;
}
