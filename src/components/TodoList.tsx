import { Todo } from '@prisma/client';
import { useActionState } from 'react';

import { deleteTodoAction } from '@/actions/todos';
import { DeleteTodoState } from '@/models/todo';

type TodoListProps = {
  todos?: Todo[];
  error?: string;
}

const initialState: DeleteTodoState = {
  success: false,
  prismaError: "",
};

const TodoList = ({ todos, error }: TodoListProps) => {
  const [state, formAction, pending] = useActionState(deleteTodoAction, initialState);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (state.prismaError) {
    return <div className="text-red-500">{state.prismaError}</div>;
  }

  if (!todos || todos.length === 0) {
    return <div>No todos available</div>;
  }

  return (
    <ul className="list-disc pl-5">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between">
          {todo.title}
          <form action={formAction}>
            <input name="todoId" className="hidden" value={todo.id} readOnly />
            <button type="submit" className="text-red-500 hover:text-red-700 ml-4" disabled={pending}>
              &#x2716;
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
