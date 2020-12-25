import React from 'react';
import styles from './Select.css';

type SelectProps = {
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <select className={styles.select} onChange={(e) => onChange(e.target.value)} defaultValue='DEFAULT'>
      <option value='DEFAULT' disabled>
        Choose account
      </option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
