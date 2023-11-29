import React from 'react';
import styles from '../../src/styles/Contributors.module.css'; // Assuming you have a CSS module for this

const contributors = [
    { name: "Contributor 1", github: "#", linkedin: "#", image: "placeholder.jpg" },
    { name: "Contributor 2", github: "#", linkedin: "#", image: "placeholder.jpg" },
    { name: "Contributor 3", github: "#", linkedin: "#", image: "placeholder.jpg" },
    { name: "Contributor 4", github: "#", linkedin: "#", image: "placeholder.jpg" },
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
                            <a href={contributor.github}>GitHub</a>
                            <a href={contributor.linkedin}>LinkedIn</a>
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
