import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './forminput.css'

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
     <div className='label-with-aestrick'>
     <label htmlFor={name}>{label }</label>
     <label style={{color:"red"}}>*</label>
     
     </div>
      <Field type={type} name={name} id={name} />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormInput;
