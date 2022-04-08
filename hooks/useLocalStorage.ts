/* eslint-disable comma-dangle */
import { useEffect, useState } from 'react';

type InitialValue = () => string;

type GetJSON = (
  // eslint-disable-next-line no-unused-vars
  key: string,
  // eslint-disable-next-line no-unused-vars
  initialValue: InitialValue | any
) => any;

const getSavedValue: GetJSON = (
  key: string,
  initialValue: InitialValue | any
) => {
  const savedValue = JSON.parse(localStorage.getItem(key) || '');
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

export default function useLocalStorage<T>(
  key: string,
  initialValue?: InitialValue | any
) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(() => getSavedValue(key, initialValue));
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return { localValue: value, saveLocalValue: setValue };
}
