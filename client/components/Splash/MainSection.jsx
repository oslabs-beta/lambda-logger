import React from 'react';
import styles from '../../src/styles/MainSection.module.css';

export default function MainSection() {
  return (
    <div className={styles.MainSection}>
      <div className={styles.LeftBox}>
        <h2>Live Debug</h2>
        <p>Meaningful logs. <br/>Labeled, tagged with colors, <br/> and searchable.</p>
      </div>
      <div className={styles.RightBox}>
        {/* Place your high-resolution GIF here */}
        <img src="../../src/images/consoleContent.png" alt="High Res" />
      </div>
    </div>
  );
}
