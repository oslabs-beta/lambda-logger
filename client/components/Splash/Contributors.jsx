import React from 'react';
import styles from '../../src/styles/Contributors.module.css'; // Assuming you have a CSS module for this

const contributors = [
  { name: 'Conrad Preston', github: 'https://github.com/Conrady82', linkedin: 'https://www.linkedin.com/in/conrad-preston-aaaa9b252/', image: '../../src/images/conrad.jpeg' },
  { name: 'Hoang Dang', github: 'https://github.com/hoangdang91768', linkedin: 'https://www.linkedin.com/in/hoang-dang-b884b4296/', image: '../../src/images/Hoang.jpeg' },
  { name: 'Luke Clarkson', github: 'https://github.com/LClarkson', linkedin: 'https://www.linkedin.com/in/ljclarkson/', image: '../../src/images/Luke.png' },
  { name: 'Nick C. Mason', github: 'https://github.com/nickmasonswe', linkedin: 'https://www.linkedin.com/in/nickmasonswe/', image: '../../src/images/Nick.jpeg' },
  // Add more contributors as needed
];

const Contributors = () => {
  return (
    <div className={styles.Contributors}>
      <div className={styles.ContributorsBox}>
        <h2>Contributors</h2>
        {contributors.map((contributor, index) => (
          <div key={index} className={styles.ContributorCard}>
            <img src={contributor.image} alt={contributor.name} />
            <div className={styles.ContributorLinks}>
              <a href={contributor.github} className="github-link">
                <img src="../../src/images/github-mark.png" alt="GitHub" className="github-icon" />
              </a>
              <a href={contributor.linkedin} className="linkedin-link">
                <img src="../../src/images/LinkedIn.png" alt="LinkedIn" className="linkedin-icon" />
              </a>
            </div>
          </div>
        ))}
        <p className={styles.ContributorsText}>Lambda Logger has so many exciting features to be developed!</p>
        <button className={styles.ContributorsButton}>Learn More</button>
      </div>
    </div>
  );
};

export default Contributors;
