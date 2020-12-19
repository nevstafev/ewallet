import Card from '../Card/Card';
import React from 'react';
import useInput from '../../hooks/useInput';
import styles from './Input.css';

type InputProps = {
  buttonText: string;
  onSubmit: <T>(valueToSubmit: T) => Promise<void>;
};

const Input: React.FC<InputProps> = ({ buttonText, onSubmit }) => {
  const { bind, reset, value } = useInput('');
  const handleSubmit = async () => {
    await onSubmit(value);
    reset();
  };
  return (
    <Card className={styles.container}>
      <input className={styles.input} {...bind} />
      <button className={styles.button} onClick={handleSubmit}>
        {buttonText}
      </button>
    </Card>
  );
};

export default Input;
