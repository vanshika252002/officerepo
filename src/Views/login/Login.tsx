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
      <div className={DATA.FormContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit(values, formikHelpers, dispatch)
        }
      >
        <Form className={DATA.Form}>
          <h1>Login</h1>
          <FormInput type={DATA.Email} name={DATA.Email} label={DATA.Email} />
          <FormInput
            type={DATA.Password}
            name={DATA.Password}
            label={DATA.Password}
          />
          <Button
            label={DATA.Login}
            type={DATA.Submit as any}
            showImage={false}
          />
          <div className={DATA.OrDivider}>{DATA.Or}</div>
          <Button
            type={DATA.TypeButton as any}
            className={DATA.GoggleButton}
            onClick={handleGoogleLogin}
            showImage
            imageSrc={ICONS.google}
          />
          <p>
            {DATA.DontHave}
            <span
              onClick={() => navigate(ROUTES.SIGNUP)}
              style={{ color: '#007bff' }}
            >
              {DATA.SignUp}
            </span>
          </p>
          <p>
            FORGOT PASSWORD
            <span
              onClick={() => navigate(ROUTES.FORGOT)}
              style={{ color: '#007bff' }}
            >
              CLICK
            </span>
          </p>
        </Form>
      </Formik>
    </div>

    </div>
  );
};
export default Login;
