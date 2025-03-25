import React from 'react';

type InputType = 'text' | 'password' | 'email' | 'number';
interface InputProps {
  type?: InputType;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  placeholder?: string;
  ref?: any;
}
const Input: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  type,
  defaultValue,
  placeholder,
  ref,
}) => {
  return (
    <div className="input-container">
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={ref}
      />
    </div>
  );
};
export default Input;
