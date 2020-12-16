import React from 'react';
import AccountCard from '../../components/AccountCard/AccountCard';
import useAccounts from '../../hooks/useAccounts';
import CreateAccount from '../createAccount/CreateAccount';
import './Accounts.css';

const Accounts: React.FC = () => {
  const { accounts, create, isLoading } = useAccounts();

  return (
    <div className='container'>
      <CreateAccount create={create} isLoading={isLoading} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        accounts.map(({ id, name, balance }) => <AccountCard key={id} name={name} balance={balance} id={id} />)
      )}
    </div>
  );
};

export default Accounts;
