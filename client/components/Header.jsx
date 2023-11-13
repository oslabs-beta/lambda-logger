//import React, { useState, useEffect } from 'react';
import React from 'react';
import styles from '../src/styles/Header.module.css';



export default function Header() {
  return (
    <div className={styles.Head}>
      <img src="../src/images/ll-logo.png" alt="Logo" />
      <h3>Lambda Logger</h3>
    </div>

  );
}