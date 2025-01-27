import Link from 'next/link';

import styles from './Navbar.module.css';

const Navbar = () => {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <Link href="/" className="text-xl font-bold">Logo</Link>
          <ul className={styles['md:flex']}>
            <li className={styles['nav-item']}>
              <Link href="/" className={styles['nav-item']}>Home</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href="/todos" className={styles['nav-item']}>Todos List</Link>
            </li>
            <li className={styles['nav-item']}>
              <Link href="/todos/create" className={styles['nav-item']}>Create Todo</Link>
            </li>
          </ul>
        </div>
        <div className={styles.flex}>
          {isAuthenticated ? (
            <button className="btn btn-secondary">Sign Out</button>
          ) : (
            <button className="btn btn-primary">Sign In</button>
          )}
          <button className="md:hidden btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <ul className={styles['md:hidden']}>
          <li className={styles['nav-item']}>
            <Link href="/" className={styles['nav-item']}>Home</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link href="/todos" className={styles['nav-item']}>Todos List</Link>
          </li>
          <li className={styles['nav-item']}>
            <Link href="/todos/create" className={styles['nav-item']}>Create Todo</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
