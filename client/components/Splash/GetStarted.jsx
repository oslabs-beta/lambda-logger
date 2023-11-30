import React from 'react';
import styles from '../../src/styles/MainSection.module.css';

const GetStarted = () => {
  return (
    <div className={styles.MainSection}>
      <div className={styles.LeftBox}>
        <h2>Getting Started</h2>
        <p>Create temporary access credentials in your AWS account, 
          then use them to scrape your logs 
          from CloudWatch and run them through our custom parser.<br/><br/>
          Lambda Logger never stores your credentials, and we dont retain 
          your logs after you leave.<br/><br/> Log streams are pulled directly from
          AWS and are ephemeral. As soon as you leave, they leave.</p>
      </div>
      <div className={styles.RightBox}>
        {/* Place your high-resolution GIF here */}
        <img src="../../src/images/creds.png" alt="High Res" />
      </div>
    </div>
  );
};

export default GetStarted;