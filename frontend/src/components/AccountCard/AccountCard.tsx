import React from 'react';
import { Link } from 'wouter';
import styles from './AccountCard.css';

type AccountCardProps = {
  name: string;
  balance: number;
  id: number;
};

const AccountCard: React.FC<AccountCardProps> = ({ name, balance, id }) => {
  return (
    <Link href={`/accounts/${id}`}>
      <div className={styles.card}>
        <div className={styles.container}>
          <div className={styles.label}>
            <b>Account name: {name}</b>
          </div>
          <div className={styles.label}>Account balance: {balance}</div>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;
