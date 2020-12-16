import { Account, Transfer } from './types';

export const getAccounts = async (): Promise<Array<Account>> => {
  const response = await fetch('/api/accounts');
  const accounts = (await response.json()) as Array<Account>;

  return accounts;
};

export const createAccount = async (name: string): Promise<Account> => {
  const response = await fetch('/api/accounts', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error while creating new account');
  }

  const account = (await response.json()) as Account;

  return account;
};

export const getAccountInfo = async (id: number): Promise<Account> => {
  const response = await fetch(`/api/accounts/${id}`);

  if (!response.ok) {
    throw new Error('Error while getting account info');
  }

  const account = (await response.json()) as Account;

  return account;
};

export const withdraw = async (id: number, amount: number): Promise<Transfer> => {
  const response = await fetch(`/api/accounts/${id}/withdraw`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error while trying withdraw money.');
  }

  const transfer = (await response.json()) as Transfer;

  return transfer;
};

export const deposit = async (id: number, amount: number): Promise<Transfer> => {
  const response = await fetch(`/api/accounts/${id}/deposit`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error while trying deposit money.');
  }

  const transfer = (await response.json()) as Transfer;

  return transfer;
};

export const transfer = async (id: number, recipient: number, amount: number): Promise<Transfer> => {
  const response = await fetch(`/api/accounts/${id}/transfers`, {
    method: 'POST',
    body: JSON.stringify({ amount, recipient }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error while trying deposit money.');
  }

  const result = (await response.json()) as Transfer;

  return result;
};

export const getTransfers = async (id: number): Promise<Array<Transfer>> => {
  const response = await fetch(`/api/accounts/${id}/transfers`);

  if (!response.ok) {
    throw new Error('Error while getting account transfers');
  }

  const account = (await response.json()) as Array<Transfer>;

  return account;
};
