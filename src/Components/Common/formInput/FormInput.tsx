import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field type={type} name={name} id={name} />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormInput;
