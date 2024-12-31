import { getTodos } from '../actions/getTodos';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <ul className="list-disc pl-5">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
