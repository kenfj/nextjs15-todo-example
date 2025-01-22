import Link from 'next/link';

import TodoList from '@/components/TodoList';
import { findAllTodos } from '@/services/todoService';
import { getCookie } from '@/utils/cookieUtils';

export default async function Home() {
  const userId = await getCookie('user_id');

  const { data: todos, message } = await findAllTodos(userId);

  return (
    <div className="container">
      <main className="main">
        <h1>Todo App</h1>
        <p>User ID: {userId}</p>
        {message && <div className="text-red-500">{message}</div>}
        <TodoList todos={todos} />
        <Link href="/create-todo">
          <button>Create Todo</button>
        </Link>
      </main>
    </div>
  );
}
