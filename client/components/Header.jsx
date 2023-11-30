import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../src/styles/Header.module.css';

export default function Header() {
  return (
    <div className={styles.Head}>
      <img className={styles.LogoTitleContainer} src="../src/images/ll-logo.png" alt="Logo" />
      <h3 className={styles.LogoTitleContainer}>Lambda Logger</h3>
      <div className={styles.NavLinks}>
        <Link to="/" className={styles.NavLink}>Home</Link>
        <Link to="/docs" className={styles.NavLink}>Docs</Link>
        <Link to="https://github.com/oslabs-beta/lambda-logger" className={styles.NavLink}>Github</Link>
        <Link to="/credentials" className={styles.NavLink}>App</Link>
      </div>
    </div>
  );
}
