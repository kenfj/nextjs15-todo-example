'use client';

import { useActionState } from 'react';
import { createTodoAction } from '@/actions/todos';

const initialState = {
  errors: {},
};

const TodoForm = () => {
  const [state, formAction, pending] = useActionState(createTodoAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text">Title:</span>
        </label>
        <input type="text" id="title" name="title" className="input input-bordered" required />
        {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
      </div>
      <div className="form-control">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">Completed:</span>
          <input type="checkbox" id="completed" name="completed" className="checkbox" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={pending}>Create Todo</button>
    </form>
  );
};

export default TodoForm;
