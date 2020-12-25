import React from 'react';
import styles from './Card.css';

type CardProps = {
  size?: 'small' | 'large' | 'medium';
  className?: string;
};

const Card: React.FC<CardProps> = (props) => {
  const { size = 'small', children, className = '' } = props;

  return (
    <div {...props} className={`${styles.card} ${styles[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
