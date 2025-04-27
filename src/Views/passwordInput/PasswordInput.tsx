import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  name: string;
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ name, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-container">
      <label htmlFor={name}>{label}</label>
      <div className="password-input-wrapper">
        <Field
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          className="password-input-field"
        />
        <span
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>
      {/* Important - show error message */}
      <ErrorMessage name={name}>
        {(msg) => <div className="error-message">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default PasswordInput;
