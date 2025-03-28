import Link from "next/link";

import TodoList from "@/components/todo-list";
import { findAllTodos } from "@/services/todo-service";

const TodosPage = async () => {
  const { data: todos, error } = await findAllTodos();

  return (
    <div className="container">
      <main className="main">
        <h1>Todos</h1>
        {error && <div className="text-red-500">{error}</div>}
        <TodoList todos={todos} />
        <Link href="/todos/create">
          <button>Create Todo</button>
        </Link>
      </main>
    </div>
  );
};

export default TodosPage;
