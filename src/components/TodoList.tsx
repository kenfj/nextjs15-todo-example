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
          {todo.title}
          <DeleteTodoButton todoId={todo.id} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
