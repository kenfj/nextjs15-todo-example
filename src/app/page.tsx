import Link from 'next/link';

import TodoList from '@/components/TodoList';
import { findAllTodos } from '@/services/todoService';
import { getUserId } from '@/utils/cookieUtils';

export default async function Home() {
  const userId = await getUserId();
  const { data: todos, error } = await findAllTodos();

  return (
    <div className="container">
      <main className="main">
        <h1>Todo App</h1>
        <p>User ID: {userId}</p>
        {error && <div className="text-red-500">{error}</div>}
        <TodoList todos={todos} />
        <Link href="/create-todo">
          <button>Create Todo</button>
        </Link>
      </main>
    </div>
  );
}
