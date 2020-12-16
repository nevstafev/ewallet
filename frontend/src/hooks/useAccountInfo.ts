import { useCallback, useEffect, useState } from 'react';
import { deposit, getAccountInfo, getTransfers, withdraw, transfer } from '../api';
import { Account, Transfer } from '../types';

const useAccountInfo = (
  id: number
): {
  account: Account | undefined;
  transfers: Array<Transfer>;
  isLoading: boolean;
  withdrawMoney: (amount: number) => Promise<void>;
  depositMoney: (amount: number) => Promise<void>;
  transferMoney: (recipient: number, amount: number) => Promise<void>;
} => {
  const [account, setAccount] = useState<Account>();
  const [transfers, setTransfers] = useState<Array<Transfer>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchAccountInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const account = await getAccountInfo(id);
      setAccount(account);
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  const fetchAccountTransfers = useCallback(async () => {
    try {
      setIsLoading(true);
      const transfers = await getTransfers(id);
      setTransfers(transfers);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const withdrawMoney = useCallback(
    async (amount: number) => {
      try {
        setIsLoading(true);
        const transfer = await withdraw(id, amount);
        setTransfers((t) => [transfer, ...t]);
        account && setAccount({ ...account, balance: account.balance - amount });
      } finally {
        setIsLoading(false);
      }
    },
    [id, account]
  );

  const depositMoney = useCallback(
    async (amount: number) => {
      try {
        setIsLoading(true);
        const transfer = await deposit(id, amount);

        setTransfers((t) => [transfer, ...t]);
        account && setAccount({ ...account, balance: account.balance + amount });
      } finally {
        setIsLoading(false);
      }
    },
    [id, account]
  );

  const transferMoney = useCallback(
    async (recipient: number, amount: number) => {
      try {
        setIsLoading(true);
        const result = await transfer(id, recipient, amount);

        setTransfers((t) => [result, ...t]);
        account && setAccount({ ...account, balance: account.balance - amount });
      } finally {
        setIsLoading(false);
      }
    },
    [id, account]
  );

  useEffect(() => {
    void fetchAccountInfo();
  }, [fetchAccountInfo]);
  useEffect(() => {
    void fetchAccountTransfers();
  }, [fetchAccountTransfers]);

  return {
    account,
    transfers,
    isLoading,
    withdrawMoney,
    depositMoney,
    transferMoney,
  };
};

export default useAccountInfo;
