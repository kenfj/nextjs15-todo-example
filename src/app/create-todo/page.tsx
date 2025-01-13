import Link from 'next/link';

import TodoForm from '@/components/TodoForm';

const CreateTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
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
