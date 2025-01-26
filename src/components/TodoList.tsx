import { Todo } from '@prisma/client';

import DeleteTodoButton from '@/components/DeleteTodoButton';

type TodoListProps = {
  todos?: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  if (!todos || todos.length === 0) {
    return <div>No todos available</div>;
  }

  return (
    <ul className="list-disc pl-5">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              className={`checkbox ${todo.completed ? 'checkbox-success' : ''}`}
              readOnly
            />
            <span className="ml-2">{todo.title}</span>
            <span className="ml-2 text-xs text-gray-500">{new Date(todo.createdAt).toLocaleString()}</span>
          </div>
          <DeleteTodoButton todoId={todo.id} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
