import { fetchTodos } from '../services/todoService';
import TodoList from '../components/TodoList';
import { toast } from 'react-hot-toast';
import { getCookie } from '../utils/cookieUtils';
import Link from 'next/link';

export default async function Home() {
  const guestUserId = await getCookie('guest_user_id');

  const { todos, error } = await fetchTodos(guestUserId);

  if (error) {
    toast.error(error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <p>Guest User ID: {guestUserId}</p>
        <TodoList todos={todos} error={error} />
        <Link href="/create-todo">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Create Todo</button>
        </Link>
      </main>
    </div>
  );
}
