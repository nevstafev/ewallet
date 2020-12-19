import React from 'react';
import styles from './Label.css';

const Label: React.FC = ({ children }) => {
  return <div className={styles.label}>{children}</div>;
};

export default Label;
