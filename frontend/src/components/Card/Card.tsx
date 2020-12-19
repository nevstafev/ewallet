import React from 'react';
import styles from './Card.css';

type CardProps = {
  size?: 'small' | 'large';
  className?: string;
};

const Card: React.FC<CardProps> = ({ size = 'small', children, className = '' }) => {
  const sizeStyle = size === 'small' ? styles.small : styles.large;

  return <div className={`${styles.card} ${sizeStyle} ${className}`}>{children}</div>;
};

export default Card;
