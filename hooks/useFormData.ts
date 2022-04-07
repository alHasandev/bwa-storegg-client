/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { Dispatch, useState } from 'react';

type ChangeFormValue = (event: { target: HTMLInputElement }) => void;

type ReturnValue = {
  formData: any;
  changeFormValue: ChangeFormValue;
  setFormData: Dispatch<any>;
};

export default function useFormData(initialFormData: any): ReturnValue {
  const [formData, setFormData] =
    useState<typeof initialFormData>(initialFormData);

  const changeFormValue = (event: { target: HTMLInputElement }) =>
    setFormData((prevData: any) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));

  return { formData, changeFormValue, setFormData };
}
