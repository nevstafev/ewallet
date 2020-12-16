import React, { useCallback, useMemo, useState } from 'react';
import useAccountInfo from '../../hooks/useAccountInfo';
import useAccounts from '../../hooks/useAccounts';
import useInput from '../../hooks/useInput';
import styles from './AccountInfo.css';
import { formatDate } from '../../utils';

type AccountInfoProps = {
  id: string;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ id }) => {
  const accountId = useMemo(() => parseInt(id), [id]);
  const { isLoading, account, transfers, withdrawMoney, depositMoney, transferMoney } = useAccountInfo(accountId);
  const { accounts, isLoading: isAccountsLoading } = useAccounts();
  const accountsToSelect = useMemo(() => accounts.filter(({ id }) => id !== accountId), [accountId, accounts]);

  const { bind: bindDeposit, reset: depositReset, value: amountToDeposit } = useInput('');
  const { bind: bindWithdraw, reset: withdrawReset, value: amountToWithdraw } = useInput('');

  const { bind: bindTransfer, reset: transferReset, value: amountToTransfer } = useInput('');

  const [selected, setSelected] = useState<number>(accountsToSelect[0]?.id);

  const handleWithdraw = useCallback(async () => {
    await withdrawMoney(parseInt(amountToWithdraw));
    withdrawReset();
  }, [withdrawReset, withdrawMoney, amountToWithdraw]);

  const handleTransfer = useCallback(async () => {
    await transferMoney(selected, parseInt(amountToTransfer));
    transferReset();
  }, [transferReset, transferMoney, amountToTransfer, selected]);

  const handleDeposit = useCallback(async () => {
    await depositMoney(parseInt(amountToDeposit));
    depositReset();
  }, [depositReset, depositMoney, amountToDeposit]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return account ? (
    <>
      <div className={styles.container}>
        <h2>Account name: {account.name}</h2>
        <h2>Account balance: {account.balance}</h2>
      </div>
      <div className={styles.container}>
        <input className={styles.input} {...bindDeposit} type='number' />
        <button type='submit' onClick={handleDeposit}>
          Deposit
        </button>
      </div>
      <div className={styles.container}>
        <input className={styles.input} {...bindWithdraw} type='number' />
        <button type='submit' onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
      {!isAccountsLoading && accountsToSelect.length > 0 && (
        <div className={styles.container}>
          <input className={styles.input} {...bindTransfer} type='number' />
          <select
            onChange={(e) => {
              setSelected(parseInt(e.target.value));
            }}
            value={selected}
            defaultValue='DEFAULT'
          >
            <option value='DEFAULT' disabled>
              Choose account
            </option>
            {accountsToSelect.map(({ id, name }) => (
              <option selected key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <button type='submit' onClick={handleTransfer}>
            Transfer money
          </button>
        </div>
      )}
      <div className={styles.label}>Account transfers</div>
      {transfers.map(({ id, createdDate, recipient, amount }) => {
        const amountStyle = recipient === accountId ? styles.deposit : styles.withdraw;
        return (
          <div key={id} className={`${styles.container} ${amountStyle}`}>
            <div className={styles.label}>Date: {formatDate(createdDate)}</div>
            <div className={styles.label}>Amount: {amount}</div>
          </div>
        );
      })}
    </>
  ) : (
    <div className={styles.label}>{"Can't get account info"}</div>
  );
};

export default AccountInfo;
