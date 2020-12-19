import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';

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
    <Card>
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
    </Card>
  );
};

export default CreateAccount;
