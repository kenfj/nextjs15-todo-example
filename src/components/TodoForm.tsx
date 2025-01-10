'use client';

import { createTodoAction } from '../actions/todos';

const TodoForm = () => {
  return (
    <form action={createTodoAction} className="flex flex-col gap-4">
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text">Title:</span>
        </label>
        <input type="text" id="title" name="title" className="input input-bordered" required />
      </div>
      <div className="form-control">
        <label htmlFor="completed" className="label cursor-pointer">
          <span className="label-text">Completed:</span>
          <input type="checkbox" id="completed" name="completed" className="checkbox" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Create Todo</button>
    </form>
  );
};

export default TodoForm;
