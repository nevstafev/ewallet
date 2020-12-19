import React from 'react';
import AccountCard from './components/AccountCard/AccountCard';
import useAccounts from '../../hooks/useAccounts';
import CreateAccount from './components/CreateAccount';

const Accounts: React.FC = () => {
  const { accounts, create, isLoading } = useAccounts();

  return (
    <>
      <CreateAccount create={create} isLoading={isLoading} />
      {accounts.map(({ id, name, balance }) => (
        <AccountCard key={id} name={name} balance={balance} id={id} />
      ))}
    </>
  );
};

export default Accounts;
