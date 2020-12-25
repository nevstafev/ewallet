import React from 'react';
import { Transfer } from '../../../../types';
import Card from '../../../../components/Card/Card';
import Label from '../../../../components/Label/Label';
import { formatDate } from '../../../../utils';
import styles from './Transfers.css';

type TransfersProps = {
  transfers: Array<Transfer>;
  accountId: number;
};

const Transfers: React.FC<TransfersProps> = ({ transfers, accountId }) => {
  return (
    <Card size={'medium'}>
      <Label>Account transfers</Label>
      {transfers.length <= 0 ? (
        <Label>There are no transfers yet.</Label>
      ) : (
        transfers.map(({ id, createdDate, recipient, amount }) => {
          const amountStyle = recipient === accountId ? styles.deposit : styles.withdraw;
          return (
            <Card key={id} className={amountStyle}>
              <Label>Date: {formatDate(createdDate)}</Label>
              <Label>Amount: {amount}</Label>
            </Card>
          );
        })
      )}
    </Card>
  );
};

export default Transfers;
