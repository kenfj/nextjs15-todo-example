import Link from "next/link";

import AuthButton from "@/components/auth/auth-button";
import { auth } from "@/lib/auth/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="navbar bg-base-300">
      <div className="mx-2 flex-1 px-2">
        <div className="flex-1">
          <div className="text-xl font-bold">Todo App</div>
          <ul className="menu menu-horizontal">
            {session
              ? (
                  <>
                    <li><Link href="/todos">Todos List</Link></li>
                    <li><Link href="/todos/create">Create Todo</Link></li>
                  </>
                )
              : (
                  <li><Link href="/">Home</Link></li>
                )}
          </ul>
        </div>
        <div className="flex-none">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
