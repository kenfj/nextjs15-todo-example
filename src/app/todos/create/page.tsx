import Link from 'next/link';

import TodoForm from '@/components/todo-form';

const CreateTodoPage = () => {
  return (
    <div className="container">
      <main className="main">
        <h1>Create Todo</h1>
        <TodoForm />
        <Link href="/todos">
          <button>Todos List</button>
        </Link>
      </main>
    </div>
  );
};

export default CreateTodoPage;
