import { useCallback, useEffect, useState } from 'react';
import { createAccount, getAccounts } from '../api';
import { Account } from '../types';

const useAccounts = (): {
  accounts: Account[];
  isLoading: boolean;
  create: (name: string) => Promise<void>;
} => {
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedAccounts = await getAccounts();
      setAccounts(fetchedAccounts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAccounts();
  }, [fetchAccounts]);

  const create = useCallback(async (name: string) => {
    try {
      setIsLoading(true);
      const account = await createAccount(name);

      setAccounts((accounts) => [...accounts, account]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { accounts, isLoading, create };
};

export default useAccounts;
