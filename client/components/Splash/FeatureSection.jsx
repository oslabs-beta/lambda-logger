import React from 'react';
import styles from '../../src/styles/FeatureSection.module.css'; // Adjust the path as needed

export default function FeatureSection() {
  return (
    <div className={styles.FeatureSection}>
      <div className={styles.Content}>
        <h2>Searchable and Readable</h2>
        <p>Using our lightweight application you can finally live de-bug your Lambdas in peace.</p>
        <button className={styles.HoverButton}>Click Me</button>
      </div>
    </div>
  );
}
