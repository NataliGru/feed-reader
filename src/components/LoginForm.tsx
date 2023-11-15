import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import '../styles/LoginForm.scss';

import userIcon from '../img/account-icon-small.png';
import closedEye from '../img/closed-eye-icon.png';
import openedEye from '../img/opened-eye-icon.png';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { user, login } = useUserContext()

  const navigate = useNavigate();

  const handleSetUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.trim());
  };

  const validateUserName = (username: string) => {
    const userNameRegex = /^[a-zA-Z]+$/;

    setUserNameError(!userNameRegex.test(username));
  };

  const handleUserNameFocus = () => {
    setUserNameError(false);
  };

  const handleUserNameBlur = () => {
    validateUserName(userName);
  };

  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim());
  };

  const validatePassword = (password: string) => {
    console.log(password);
    setPasswordError(password.length < 8);
  };

  const handlePasswordFocus = () => {
    setPasswordError(false);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    validateUserName(userName);
    validatePassword(password);

    if (password && userName && !userNameError && !passwordError) {
      login();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login">
      <h1 className='login__title'>Login</h1>

      <div className="input-container">
        <div
          className={classNames('input', {
            error__username: userNameError,
          })}
        >
          <input
            className="input__area"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleSetUserName}
            onFocus={handleUserNameFocus}
            onBlur={handleUserNameBlur}
            onKeyDown={handleKeyDown}
          />
          <button className="input__label">
            <img src={userIcon} alt="user-icon" className="input__icon" />
          </button>
        </div>

        <div
          className={classNames('input', {
            error__password: passwordError,
          })}
        >
          <input
            className="input__area"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handleSetPassword}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onKeyDown={handleKeyDown}
          />
          <button
            className={classNames('input__label', {
              'password-toggle': password.length !== 0,
            })}
            disabled={password.length === 0}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img src={closedEye} alt="user-icon" className="input__icon" />
            ) : (
              <img src={openedEye} alt="user-icon" className="input__icon" />
            )}
          </button>
        </div>
      </div>
        <motion.button 
        onClick={handleLogin}
        className="button" 
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        Login
      </motion.button>
    </div>
  );
};
