import React, { useCallback, useMemo, useState } from 'react';
import useAccountInfo from '../../hooks/useAccountInfo';
import useAccounts from '../../hooks/useAccounts';
import Card from '../../components/Card/Card';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import Transfers from '../../features/accountInfo/compmentns/Transfers/Transfers';
import Label from '../../components/Label/Label';

type AccountInfoProps = {
  id: string;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ id }) => {
  const accountId = useMemo(() => parseInt(id), [id]);
  const { account, transfers, withdrawMoney, depositMoney, transferMoney } = useAccountInfo(accountId);
  const { accounts, isLoading: isAccountsLoading } = useAccounts();
  const accountsToSelect = useMemo(() => accounts.filter(({ id }) => id !== accountId), [accountId, accounts]);

  const [selected, setSelected] = useState<number>(accountsToSelect[0]?.id);

  const handleWithdraw = useCallback(
    async (amountToWithdraw) => {
      await withdrawMoney(parseInt(amountToWithdraw));
    },
    [withdrawMoney]
  );

  const handleTransfer = useCallback(
    async (amountToTransfer) => {
      await transferMoney(selected, parseInt(amountToTransfer));
    },
    [transferMoney, selected]
  );

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
        <Card size={'medium'}>
          <Label>Transfer money to another account</Label>
          <Select
            onChange={(value) => setSelected(parseInt(value))}
            options={accountsToSelect.map(({ id, name }) => ({ value: String(id), label: name }))}
          />
          <Input buttonText='Transfer' onSubmit={handleTransfer} />
        </Card>
      )}
      <Transfers transfers={transfers} accountId={accountId} />
    </>
  ) : (
    <Label>{"Can't get account info"}</Label>
  );
};

export default AccountInfo;
