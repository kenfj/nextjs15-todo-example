import Link from 'next/link';
import { toast } from 'react-hot-toast';
import styles from './HomePage.module.css';

import TodoList from '@/components/TodoList';
import { findAllTodos } from '@/services/todoService';
import { getCookie } from '@/utils/cookieUtils';

export default async function Home() {
  const userId = await getCookie('user_id');

  const { todos, error } = await findAllTodos(userId);

  if (error) {
    toast.error(error);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Todo App</h1>
        <p>User ID: {userId}</p>
        <TodoList todos={todos} error={error} />
        <Link href="/create-todo">
          <button>Create Todo</button>
        </Link>
      </main>
    </div>
  );
}
