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
        <a href="https://github.com/oslabs-beta/lambda-logger" target="_blank" rel="noopener noreferrer" className={styles.NavLink}>
          Docs
        </a>
        <a href="https://github.com/oslabs-beta/lambda-logger" target="_blank" rel="noopener noreferrer" className={styles.NavLink}>
          Github
        </a>
        <Link to="/credentials" className={styles.NavLink}>App</Link>
      </div>
    </div>
  );
}
