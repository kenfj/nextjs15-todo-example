import { Todo } from '@prisma/client';

import { deleteTodoAction } from '@/actions/todos';

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

  const handleDelete = async (data : FormData) => {
    'use server'
    const todoId = data.get("todoId");
    if (todoId) {
      const result = await deleteTodoAction(Number(todoId));
      if (!result.success) {
        console.error(result.prismaError);
      }
    }
  }

  return (
    <ul className="list-disc pl-5">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between">
          {todo.title}
          <form action={handleDelete}>
            <input name="todoId" className="hidden" value={todo.id} readOnly/>
            <button type="submit" className="text-red-500 hover:text-red-700 ml-4">
              &#x2716;
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
