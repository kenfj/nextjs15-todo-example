"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { deleteTodoAction } from "@/actions/todos";
import { DeleteTodoState } from "@/models/todo";

type DeleteTodoButtonProps = {
  id: number;
};

const DeleteTodoButton = ({ id }: DeleteTodoButtonProps) => {
  const [state, setState] = useState<DeleteTodoState>();
  const { pending } = useFormStatus();

  const handleDelete = async () => {
    const result = await deleteTodoAction(id);
    setState(result);
  };

  return (
    <>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700 ml-4" disabled={pending}>
        &#x2716;
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </>
  );
};

export default DeleteTodoButton;
