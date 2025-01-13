import Link from 'next/link';
import styles from './CreateTodoPage.module.css';

import TodoForm from '@/components/TodoForm';

const CreateTodoPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className="text-4xl font-bold">Create Todo</h1>
        <TodoForm />
        <Link href="/">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Home</button>
        </Link>
      </main>
    </div>
  );
};

export default CreateTodoPage;
