import React, { useCallback, useState } from 'react';
import styles from './CreateAccount.css';

type CreateAccountProps = {
  create: (name: string) => Promise<void>;
  isLoading: boolean;
};

const CreateAccount: React.FC<CreateAccountProps> = ({ create, isLoading }) => {
  const [name, setName] = useState<string>('');
  const handleCreate = useCallback(async () => {
    try {
      await create(name);
    } finally {
      setName('');
    }
  }, [create, name]);

  return (
    <div className={styles.container}>
      <input
        type='text'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button disabled={isLoading} type='submit' onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default CreateAccount;
