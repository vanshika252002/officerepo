import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../Shared/Constants';
import {
  validationSchema,
  handleSignUpSubmit,
  initialValues,
} from '../../Shared/signup';
import { Button, FormInput } from '../../Components/Common';
import useSignUp from './hooks/useSignUp';


import { ICONS } from '../../assets';
import { DATA } from '../index';
import './signup.css';

const SignUp: React.FC = () => {
  const { handleGoogleSignIn } = useSignUp();
  const navigate = useNavigate();
  return (
   <div className='signup-wrapper-component'>
    <div className='login-image'><img src={ICONS.login} /></div>
     <div className={DATA.FormContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSignUpSubmit(values, actions, navigate)}
      >
        <Form className={DATA.Form}>
          <h1>{DATA.SignUp}</h1>
          <FormInput name={DATA.Email} type={DATA.Email} label="Email" />
          <FormInput
            name={DATA.Password}
            type={DATA.Password}
            label="Password"
          />
          <FormInput
            name={DATA.ConfirmPassword}
            type={DATA.Password}
            label="ConfirmPassword"
          />
          <Button
            label={DATA.SignUp}
            type={DATA.Submit as any}
            showImage={false}
          />
          <div className={DATA.OrDivider}>{DATA.Or}</div>
          <Button
            type={DATA.TypeButton as any}
            className={DATA.GoggleButton}
            onClick={handleGoogleSignIn}
            showImage
            imageSrc={ICONS.google}
          />
          <p>
            {DATA.AlreadyHave}
            <span
              onClick={() => navigate(ROUTES.LOGIN)}
              style={{ color: '#007bff' }}
            >
              {DATA.Login}
            </span>
          </p>
        </Form>
      </Formik>
    </div>

   </div>
  );
};
export default SignUp;
