import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>BIGFOOT</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/team">Time</Link>
        <Link href="/events">Eventos</Link>
      </nav>
    </header>
  );
}
