import React from 'react';
import { Route } from 'wouter';
import AccountInfo from './accountInfo/AccountInfo';
import Layout from '../components/Layout/Layout';
import Accounts from './accounts/Accounts';

const App: React.FC = () => {
  return (
    <Layout>
      <Route path='/'>
        <Accounts />
      </Route>
      <Route path='/accounts/:id'>{({ id }) => <AccountInfo id={id} />}</Route>
    </Layout>
  );
};

export default App;
