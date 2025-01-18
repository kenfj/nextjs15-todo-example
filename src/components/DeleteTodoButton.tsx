'use client'

import { useState } from 'react';
import { useFormStatus } from 'react-dom';

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
  const [state, setState] = useState<DeleteTodoState>(initialState);
  const { pending } = useFormStatus();

  const handleDelete = async () => {
    const result = await deleteTodoAction(todoId);
    setState(result);
  };

  return (
    <>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700 ml-4" disabled={pending}>
        &#x2716;
      </button>
      {state.message && <p className="text-red-500">{state.message}</p>}
    </>
  )
};

export default DeleteTodoButton;
