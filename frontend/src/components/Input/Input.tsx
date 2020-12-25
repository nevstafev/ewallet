import Card from '../Card/Card';
import React from 'react';
import useInput from '../../hooks/useInput';
import styles from './Input.css';

type InputProps = {
  buttonText: string;
  onSubmit: <T>(valueToSubmit: T) => Promise<void>;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({ buttonText, onSubmit, disabled = false }) => {
  const { bind, reset, value } = useInput('');
  const handleSubmit = async () => {
    await onSubmit(value);
    reset();
  };

  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSubmit();
    }
  };

  return (
    <Card className={styles.container}>
      <input className={styles.input} {...bind} onKeyDown={handleEnterKey} />
      <button className={styles.button} onClick={handleSubmit} disabled={disabled}>
        {buttonText}
      </button>
    </Card>
  );
};

export default Input;
