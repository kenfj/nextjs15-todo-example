import Link from 'next/link';

import { auth } from "@/auth";
import AuthButton from '@/components/auth-button';

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className={"navbar bg-base-300"}>
      <div className={"mx-2 flex-1 px-2"}>
        <div className={"flex-1"}>
          <Link href="/" className="text-xl font-bold">Todo App</Link>
          <ul className="menu menu-horizontal">
            <li><Link href="/">Home</Link></li>
            {session && (
              <>
                <li><Link href="/todos">Todos List</Link></li>
                <li><Link href="/todos/create">Create Todo</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className={"flex-none"}>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
