import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const submit = (e) => {
    e.preventDefault();
    callback();
  }

  return {
      handleChange,
      submit,
      values
  }

};
