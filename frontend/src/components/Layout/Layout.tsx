import React from 'react';
import styles from './Layout.css';

const Layout: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
