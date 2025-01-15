'use client'

import { useActionState } from 'react';

import { deleteTodoAction } from '@/actions/todos';
import { DeleteTodoState } from '@/models/todo';

const initialState: DeleteTodoState = {
  success: false,
  prismaError: "",
};

type DeleteTodoButtonProps = {
  todoId: number;
}

const DeleteTodoButton = ({ todoId }: DeleteTodoButtonProps) => {
  const [state, formAction, pending] = useActionState(deleteTodoAction, initialState);

  if (state.prismaError) {
    return <div className="text-red-500">{state.prismaError}</div>;
  }

  return (
    <form action={formAction}>
      <input name="todoId" className="hidden" value={todoId} readOnly />
      <button type="submit" className="text-red-500 hover:text-red-700 ml-4" disabled={pending}>
        &#x2716;
      </button>
      {state.prismaError && <p className="text-red-500">{state.prismaError}</p>}
    </form>
  )
};

export default DeleteTodoButton;
