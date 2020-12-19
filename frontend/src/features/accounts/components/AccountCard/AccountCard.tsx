import React from 'react';
import { Link } from 'wouter';
import styles from './AccountCard.css';
import Card from '../../../../components/Card/Card';

type AccountCardProps = {
  name: string;
  balance: number;
  id: number;
};

const AccountCard: React.FC<AccountCardProps> = ({ name, balance, id }) => {
  return (
    <Link href={`/accounts/${id}`}>
      <div className={styles.pointer}>
        <Card>
          <div className={styles.label}>
            <b>Account name: {name}</b>
          </div>
          <div className={styles.label}>Account balance: {balance}</div>
        </Card>
      </div>
    </Link>
  );
};

export default AccountCard;
