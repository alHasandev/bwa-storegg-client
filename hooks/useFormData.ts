/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { Dispatch, useState } from 'react';

type ChangeFormValue = (event: { target: HTMLInputElement }) => void;

type ReturnValue<T> = {
  formData: T;
  changeFormValue: ChangeFormValue;
  setFormData: Dispatch<T>;
};

export default function useFormData<T>(initialFormData: T): ReturnValue<T> {
  const [formData, setFormData] = useState<T>(initialFormData);

  const changeFormValue = (event: { target: HTMLInputElement }) =>
    setFormData((prevData: T) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));

  return { formData, changeFormValue, setFormData };
}
