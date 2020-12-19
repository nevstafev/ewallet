import React, { useCallback, useMemo, useState } from 'react';
import useAccountInfo from '../../hooks/useAccountInfo';
import useAccounts from '../../hooks/useAccounts';
import useInput from '../../hooks/useInput';
import styles from './AccountInfo.css';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Transfers from '../../features/accountInfo/compmentns/Transfers/Transfers';

type AccountInfoProps = {
  id: string;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ id }) => {
  const accountId = useMemo(() => parseInt(id), [id]);
  const { account, transfers, withdrawMoney, depositMoney, transferMoney, isLoading } = useAccountInfo(accountId);
  const { accounts, isLoading: isAccountsLoading } = useAccounts();
  const accountsToSelect = useMemo(() => accounts.filter(({ id }) => id !== accountId), [accountId, accounts]);

  const { bind: bindTransfer, reset: transferReset, value: amountToTransfer } = useInput('');

  const [selected, setSelected] = useState<number>(accountsToSelect[0]?.id);

  const handleWithdraw = useCallback(
    async (amountToWithdraw) => {
      await withdrawMoney(parseInt(amountToWithdraw));
    },
    [withdrawMoney]
  );

  const handleTransfer = useCallback(async () => {
    await transferMoney(selected, parseInt(amountToTransfer));
    transferReset();
  }, [transferReset, transferMoney, amountToTransfer, selected]);

  const handleDeposit = useCallback(
    async (amountToDeposit) => {
      await depositMoney(parseInt(amountToDeposit));
    },
    [depositMoney]
  );

  return account ? (
    <>
      <Card>
        <h2>Account name: {account.name}</h2>
        <h2>Account balance: {account.balance}</h2>
      </Card>
      <Input buttonText='Deposit' onSubmit={handleDeposit} />
      <Input buttonText='Withdraw' onSubmit={handleWithdraw} />

      {!isAccountsLoading && accountsToSelect.length > 0 && (
        <Card>
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
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <button type='submit' onClick={handleTransfer} disabled={isLoading}>
            Transfer money
          </button>
        </Card>
      )}
      <Transfers transfers={transfers} accountId={accountId} />
    </>
  ) : (
    <div className={styles.label}>{"Can't get account info"}</div>
  );
};

export default AccountInfo;
