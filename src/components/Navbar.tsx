import Link from 'next/link';
import SignIn from '@/components/sign-in';
import SignOut from '@/components/sign-out';

const Navbar = () => {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <nav className={"navbar bg-base-300"}>
      <div className={"mx-2 flex-1 px-2"}>
        <div className={"flex-1"}>
          <Link href="/" className="text-xl font-bold">Todo App</Link>
          <ul className="menu menu-horizontal">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/todos">Todos List</Link></li>
            <li><Link href="/todos/create">Create Todo</Link></li>
          </ul>
        </div>
        <div className={"flex-none"}>
          {isAuthenticated ? (
            <SignOut />
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
