import React from 'react';
import styles from '../../src/styles/Footer.module.css'; // Assuming you have a CSS module for this

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul className={styles.FooterLinks}>
        <li><a href="#community" className={styles.FooterLink}>Community</a></li>
        <li><a href="https://github.com" className={styles.FooterLink}>GitHub</a></li>
        <li><a href="https://linkedin.com" className={styles.FooterLink}>LinkedIn</a></li>
        <br></br>
        <li><p>MIT License</p></li>
      </ul>
    </div>
  );
};

export default Footer;
