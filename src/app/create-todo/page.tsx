import TodoForm from '../../components/TodoForm';

const CreateTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Create Todo</h1>
        <TodoForm />
      </main>
    </div>
  );
};

export default CreateTodoPage;
