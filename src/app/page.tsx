import { fetchTodos } from '../services/todoService';
import TodoList from '../components/TodoList';
import { toast } from 'react-hot-toast';

export default async function Home() {
  const { todos, error } = await fetchTodos();

  if (error) {
    toast.error(error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <TodoList todos={todos} error={error} />
      </main>
    </div>
  );
}
