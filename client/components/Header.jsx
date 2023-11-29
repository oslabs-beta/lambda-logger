import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../src/styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.Head}>
      <img src="../src/images/ll-logo.png" alt="Logo" />
      <h3>Lambda Logger</h3>
      <div className={styles.NavLinks}>
        <Link to="/" className={styles.NavLink}>Home</Link>
        <Link to="/docs" className={styles.NavLink}>Docs</Link>
        <Link to="/github" className={styles.NavLink}>Github</Link>
        <Link to="/credentials" className={styles.NavLink}>App</Link>
      </div>
    </div>
  );
}
