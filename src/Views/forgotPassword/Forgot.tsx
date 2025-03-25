import { useState } from 'react';
import { forgotPassword } from '../../Shared/forgot';
import { Button, Input } from '../../Components/Common';
import './forgot.css';

function Forgot() {
  // console.log("forgot password");
  const [email, setEmail] = useState<string>('');
  return (
    <div className="forgot-container">
      <div className="forgot-form">
        <h2>Reset your Password</h2>
      </div>
      <div>
        <label>
          Enter your user account's verified email address and we will send you
          a password reset link.
        </label>
        <Input
          type="text"
          placeholder="enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          label="Send password reset email"
          onClick={() => forgotPassword(email)}
        />
      </div>
    </div>
  );
}
export default Forgot;
