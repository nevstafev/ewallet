import React, { useCallback } from 'react';
import AccountCard from './components/AccountCard/AccountCard';
import useAccounts from '../../hooks/useAccounts';
import Input from '../../components/Input/Input';

const Accounts: React.FC = () => {
  const { accounts, create, isLoading } = useAccounts();
  const handleCreate = useCallback(
    async (name) => {
      await create(name);
    },
    [create]
  );
  return (
    <>
      <Input buttonText='Create' onSubmit={handleCreate} disabled={isLoading} />
      {accounts.map(({ id, name, balance }) => (
        <AccountCard key={id} name={name} balance={balance} id={id} />
      ))}
    </>
  );
};

export default Accounts;
