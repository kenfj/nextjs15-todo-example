import { Todo } from '@prisma/client';

type TodoListProps = {
  todos?: Todo[];
  error?: string;
}

const TodoList = ({ todos, error }: TodoListProps) => {
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!todos || todos.length === 0) {
    return <div>No todos available</div>;
  }

  return (
    <ul className="list-disc pl-5">
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default TodoList;
