import React from 'react';
import { Link } from 'wouter';
import styles from './AccountCard.css';
import Card from '../../../../components/Card/Card';
import Label from '../../../../components/Label/Label';

type AccountCardProps = {
  name: string;
  balance: number;
  id: number;
};

const AccountCard: React.FC<AccountCardProps> = ({ name, balance, id }) => {
  return (
    <Link href={`/accounts/${id}`}>
      <Card className={styles.pointer}>
        <Label>Account name: {name}</Label>
        <Label>Account balance: {balance}</Label>
      </Card>
    </Link>
  );
};

export default AccountCard;
