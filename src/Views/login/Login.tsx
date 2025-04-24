import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../Shared/Constants';
import { Button, FormInput } from '../../Components/Common';
import { validationSchema, onSubmit, initialValues } from '../../Shared/login';
import useLogin from './hooks/useLogin';
import { DATA } from '../index';

import { ICONS } from '../../assets';
import './login.css';

const Login: React.FC = () => {
  const { handleGoogleLogin } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='login-wrapper-component'>
       <div className='login-image'><img src={ICONS.login} /></div>
      <div className="signup-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit(values, formikHelpers, dispatch)
        }
      >
        <Form className={DATA.Form}>
          <h1>Login</h1>
          <FormInput type={DATA.Email} name={DATA.Email} label="Email" />
          <FormInput
            type={DATA.Password}
            name={DATA.Password}
            label="Password"
          />
          <Button
            label={DATA.Login}
            type={DATA.Submit as any}
            showImage={false}
            className='signup-form-btn '
          />
          <div className={DATA.OrDivider}>{DATA.Or}</div>
          <button
          className='signup-form-btn1 '
            onClick={handleGoogleLogin}
          > <img src={ICONS.google}/> <span>Login with Google</span></button>
          <p>
            {DATA.DontHave}
            <button 
             className='login-signup-btn'
              onClick={() => navigate(ROUTES.SIGNUP)}
              style={{ color: '#007bff' }}
            >
              {DATA.SignUp}
            </button>
          </p>
          <p>
            
            <button
            className='login-signup-btn'
              onClick={() => navigate(ROUTES.FORGOT)}
              style={{ color: '#007bff' }}
            >
              Forgot Password?
            </button>
          </p>
        </Form>
      </Formik>
    </div>

</div>
  );
};
export default Login;