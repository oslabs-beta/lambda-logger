import React from 'react';
import styles from '../../src/styles/Footer.module.css'; 

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul className={styles.FooterLinks}>
        <li><a href="https://github.com/oslabs-beta/lambda-logger" target="_blank" rel="noopener noreferrer" className={styles.FooterLink}>GitHub</a></li>
        <br></br>
        <li><p>@ 2023 | MIT License</p></li>
      </ul>
    </div>
  );
};

export default Footer;
