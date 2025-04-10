import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    redirect("/todos");
  }

  return (
    <div className="container">
      <main className="main">
        <h1>Welcome to the Todo App</h1>
        <p>Please log in to access your todos.</p>
        <Link href="/about">About</Link>
      </main>
    </div>
  );
}
