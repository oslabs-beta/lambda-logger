import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../src/styles/FeatureSection.module.css'; // Adjust the path as needed

export default function FeatureSection() {
  return (
    <div className={styles.FeatureSection}>
      <div className={styles.Content}>
        <h2>Searchable and Readable</h2>
        <p>Lambda Logger gives you the power to quickly read and search <br/> any log file you need straight from our seamless, secure dashboard. <br/>
        Lightweight and optimized so you can finally <br/>live de-bug your Lambdas in peace.</p>
        <Link to="/credentials">
          <button className={styles.HoverButton}>Try Now</button>
        </Link>
      </div>
    </div>
  );
}
