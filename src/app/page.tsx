import { redirect } from 'next/navigation';

import { getUserId } from '@/utils/cookieUtils';

export default async function Home() {
  const userId = await getUserId();

  if (!userId) {
    return (
      <div className="container">
        <main className="main">
          <h1>Welcome to the Todo App</h1>
          <p>Please log in to access your todos.</p>
        </main>
      </div>
    );
  }

  redirect('/todos');
}
