import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link href="/todos">Todos List</Link>
        </li>
        <li className="nav-item">
          <Link href="/todos/create">Create Todo</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
