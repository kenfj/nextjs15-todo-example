'use client'

import { useActionState } from 'react';

import { deleteTodoAction } from '@/actions/todos';
import { DeleteTodoState } from '@/models/todo';

const initialState: DeleteTodoState = {
  success: false,
  message: "",
};

type DeleteTodoButtonProps = {
  todoId: number;
}

const DeleteTodoButton = ({ todoId }: DeleteTodoButtonProps) => {
  const [state, formAction, pending] = useActionState(deleteTodoAction, initialState);

  return (
    <form action={formAction}>
      <input name="todoId" className="hidden" value={todoId} readOnly />
      <button type="submit" className="text-red-500 hover:text-red-700 ml-4" disabled={pending}>
        &#x2716;
      </button>
      {state.message && <p className="text-red-500">{state.message}</p>}
    </form>
  )
};

export default DeleteTodoButton;
