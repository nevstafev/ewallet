export type Account = {
  id: number;
  name: string;
  balance: number;
};

export type Transfer = {
  id: number;
  createdDate: string;
  sender: number;
  recipient: number;
  amount: number;
};
