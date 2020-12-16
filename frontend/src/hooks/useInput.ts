import React, { ChangeEvent, useState } from 'react';

const useInput = (
  initialValue: string
): {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
  bind: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  };
} => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(event.target.value);
      },
    },
  };
};

export default useInput;
