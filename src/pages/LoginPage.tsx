import React from 'react';
import { LoginForm } from '../components/LoginForm';

import '../styles/LoginPage.scss';

export const LoginPage: React.FC = () => {

  return (
    <div className='login-page'>
      <LoginForm />
    </div>
  );
};
